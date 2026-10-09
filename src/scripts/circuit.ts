/**
 * A printed-circuit bus that builds itself as the page scrolls: it leaves the "MT" chip in the hero,
 * snakes through every section (merging with the experience timeline) and plugs into the contact email.
 * A light head travels the bus about two thirds down the screen; nothing exists ahead of it.
 * Everything is measured from the real layout, in document coordinates, and drawn on one fixed canvas.
 */

export interface Circuit {
  rebuild(): void;
  setPointer(clientX: number, clientY: number): void;
  powerOn(): void;
  dispose(): void;
}

interface Options {
  reducedMotion: boolean;
}

interface Pt {
  x: number;
  y: number;
}

interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
}

interface Branch {
  points: Pt[];
  lengths: number[];
  total: number;
  param: number;
  end: 'pad' | 'via' | 'smd';
  dir: Pt;
}

interface Signal {
  trace: number;
  s: number;
  speed: number;
}

const ACCENT = '124, 140, 255';
const HOT = '230, 233, 255';
const HEAD_AT = 0.66;
const SPACING = 9;
const BUS = 5;
const CHAMFER = 22;
const GRID = 32;

/** The chip's "firmware version": years since 2019, bumped every January 1st. */
const CAREER_START_YEAR = 2019;
const careerVersion = () => `v${new Date().getFullYear() - CAREER_START_YEAR}.0`;

function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const sub = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y });
const len = (v: Pt) => Math.hypot(v.x, v.y);
const norm = (v: Pt): Pt => {
  const l = len(v) || 1;
  return { x: v.x / l, y: v.y / l };
};
/** Left-hand normal of a direction: travelling down it points left, travelling right it points down. */
const normal = (d: Pt): Pt => ({ x: -d.y, y: d.x });

/** Forces an orthogonal route to only ever go down or sideways, with room for its corners. */
function tidy(route: Pt[], minDrop: number): Pt[] {
  const out: Pt[] = [route[0]];
  for (let i = 1; i < route.length; i++) {
    const prev = out[out.length - 1];
    const p = { ...route[i] };
    if (Math.abs(p.x - prev.x) < 0.5) p.y = Math.max(p.y, prev.y + minDrop);
    else p.y = prev.y;
    if (Math.abs(p.x - prev.x) < 0.5 && Math.abs(p.y - prev.y) < 0.5) continue;
    out.push(p);
  }
  // drop middle points of straight runs
  return out.filter((p, i) => {
    if (i === 0 || i === out.length - 1) return true;
    const a = norm(sub(p, out[i - 1]));
    const b = norm(sub(out[i + 1], p));
    return Math.abs(a.x - b.x) > 1e-3 || Math.abs(a.y - b.y) > 1e-3;
  });
}

/** Cuts every 90° corner into two 45° turns, like a PCB trace. */
function chamfer(route: Pt[], size: number): Pt[] {
  const out: Pt[] = [route[0]];
  for (let i = 1; i < route.length - 1; i++) {
    const p = route[i];
    const din = sub(p, route[i - 1]);
    const dout = sub(route[i + 1], p);
    const c = Math.min(size, len(din) / 2.2, len(dout) / 2.2);
    const a = norm(din);
    const b = norm(dout);
    out.push({ x: p.x - a.x * c, y: p.y - a.y * c }, { x: p.x + b.x * c, y: p.y + b.y * c });
  }
  out.push(route[route.length - 1]);
  return out;
}

/** Parallel copy of a polyline at distance d on its left-hand side, with mitred joints. */
function offset(route: Pt[], d: number): Pt[] {
  return route.map((p, i) => {
    const nIn = i > 0 ? normal(norm(sub(p, route[i - 1]))) : null;
    const nOut = i < route.length - 1 ? normal(norm(sub(route[i + 1], p))) : null;
    let m: Pt;
    if (nIn && nOut) {
      const k = 1 + nIn.x * nOut.x + nIn.y * nOut.y;
      m = { x: (nIn.x + nOut.x) / k, y: (nIn.y + nOut.y) / k };
    } else {
      m = (nIn ?? nOut)!;
    }
    return { x: p.x + m.x * d, y: p.y + m.y * d };
  });
}

export function createCircuit(canvas: HTMLCanvasElement, { reducedMotion }: Options): Circuit | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let W = 0;
  let H = 0;
  let dpr = 1;
  let traces: Pt[][] = [];
  let params: number[] = [];
  let startParam = 0;
  let endParam = 0;
  let branches: Branch[] = [];
  let dims: Box[] = [];
  let chip: Box | null = null;
  let powered: HTMLElement | null = null;
  let mobile = false;
  // rem scale: the site renders at 80% on desktop, the board follows
  let u = 1;
  let grid = GRID;

  const pointer = { x: -9999, y: -9999, active: false };
  let power = reducedMotion ? 1 : 0;
  let powerTarget = power;
  const signals: Signal[] = [];
  let spawnIn = 0;
  let running = true;
  const version = careerVersion();
  let last = performance.now();
  let time = 0;

  const measure = (el: Element | null): Box | null => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const sy = window.scrollY;
    return {
      left: r.left,
      right: r.right,
      top: r.top + sy,
      bottom: r.bottom + sy,
      width: r.width,
      height: r.height,
      cx: r.left + r.width / 2,
      cy: r.top + sy + r.height / 2,
    };
  };

  const rebuild = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    mobile = W < 860;
    u = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
    grid = GRID * u;
    const spacing = SPACING * u;
    const corner = CHAMFER * u;

    const q = (s: string) => document.querySelector(s);
    chip = measure(q('.chip-anchor'));
    const about = measure(q('#about'));
    const content = measure(q('#about .section-inner'));
    const portrait = measure(q('.portrait'));
    const aboutCopy = measure(q('.about-copy'));
    const experience = measure(q('#experience'));
    const timeline = measure(q('[data-timeline]'));
    const marker = measure(q('.entry-marker'));
    const projects = measure(q('#projects'));
    const groups = [...document.querySelectorAll('.group')].map((g) => measure(g)!);
    const education = measure(q('#education'));
    const arrow = measure(q('.contact-email-arrow'));
    powered = q('.contact-email') as HTMLElement | null;

    traces = [];
    branches = [];
    if (!chip || !about || !content || !experience || !timeline || !marker || !projects || !education || !arrow) return;

    const count = mobile ? 1 : BUS;
    const half = ((count - 1) / 2) * spacing;
    const fan = mobile ? 1 : (chip.width * 0.16) / spacing;
    const clampX = (x: number) => Math.min(W - 8, Math.max(8, x));
    const trackX = marker.cx;
    const yStart = chip.bottom;

    // the spine of the bus (trace 0); other traces run parallel on its left-hand side
    let route: Pt[];
    if (mobile) {
      const railX = 12 * u;
      route = [
        { x: chip.cx, y: yStart + 40 * u },
        { x: chip.cx, y: yStart + 80 * u },
        { x: railX, y: 0 },
        { x: railX, y: marker.cy - 70 * u },
        { x: trackX, y: 0 },
        { x: trackX, y: timeline.bottom },
        { x: railX, y: 0 },
        { x: railX, y: arrow.top - 60 * u },
        { x: arrow.cx, y: 0 },
        { x: arrow.cx, y: arrow.top - 24 * u },
      ];
    } else {
      const gapX = portrait && aboutCopy ? (portrait.right + aboutCopy.left) / 2 : content.left + content.width * 0.42;
      const rightX = content.right - 30 * u;
      const projX = content.left + 60 * u;
      const sideBySide = groups.length === 2 && groups[1].top < groups[0].bottom - 10;
      const eduX = sideBySide ? (groups[0].right + groups[1].left) / 2 + half : rightX;
      route = [
        { x: chip.cx + half, y: yStart + 96 * u },
        { x: chip.cx + half, y: about.top + 56 * u },
        { x: gapX + half, y: 0 },
        { x: gapX + half, y: about.bottom - 36 * u },
        { x: rightX, y: 0 },
        { x: rightX, y: marker.cy - 90 * u },
        { x: trackX, y: 0 },
        { x: trackX, y: experience.bottom - 50 * u },
        { x: projX, y: 0 },
        { x: projX, y: projects.bottom - 50 * u },
        { x: eduX, y: 0 },
        { x: eduX, y: education.bottom - 50 * u },
        { x: arrow.cx + half, y: 0 },
        { x: arrow.cx + half, y: arrow.top - 70 * u },
      ];
    }
    route = chamfer(
      tidy(
        route.map((p) => ({ x: clampX(p.x), y: p.y })),
        corner * 2.5,
      ),
      corner,
    );

    // pins: the bus fans out of the chip's bottom pins, and fans into the email's arrow
    for (let k = 0; k < count; k++) {
      const d = k * spacing;
      const body = offset(route, d);
      const pinX = chip.cx + (half - d) * fan;
      const head: Pt[] = mobile
        ? [
            { x: chip.cx, y: yStart },
            { x: chip.cx, y: yStart + 20 * u },
          ]
        : [
            { x: pinX, y: yStart },
            { x: pinX, y: yStart + 26 * u },
          ];
      // each trace drops straight onto the arrow's rim at its own x, like pins plugging into a socket
      const radius = arrow.width / 2;
      const dx = half - d;
      const tail: Pt = { x: arrow.cx + dx, y: arrow.cy - Math.sqrt(Math.max(0, radius * radius - dx * dx)) };
      traces.push([...head, ...body, tail]);
    }

    // scroll budget: every downward pixel costs one pixel of scroll; horizontal runs borrow a
    // little from the drop before them so the head dashes sideways and lands back at 2/3
    const spine = traces[0];
    const durations: number[] = [];
    const original: number[] = [];
    const horizontal: boolean[] = [];
    for (let i = 0; i < spine.length - 1; i++) {
      const dy = spine[i + 1].y - spine[i].y;
      const isH = Math.abs(dy) < 0.5;
      horizontal.push(isH);
      durations.push(isH ? 0 : Math.max(0, dy));
      original.push(isH ? 0 : Math.max(0, dy));
    }
    for (let j = 0; j < durations.length; j++) {
      if (!horizontal[j]) continue;
      let want = 0.25 * Math.abs(spine[j + 1].x - spine[j].x);
      for (let i = j - 1; i >= 0 && want > 0; i--) {
        if (horizontal[i]) continue;
        const take = Math.min(want, durations[i] - original[i] * 0.25);
        if (take <= 0) continue;
        durations[i] -= take;
        durations[j] += take;
        want -= take;
      }
    }
    params = [yStart];
    for (const d of durations) params.push(params[params.length - 1] + d);
    startParam = params[0];
    endParam = params[params.length - 1];

    // decorative branches off the outer traces, deterministic so the board looks the same each visit
    if (!mobile) {
      const rand = seeded(1022);
      const sides = [
        { trace: count - 1, outward: 1 },
        { trace: 0, outward: -1 },
      ];
      for (let i = 2; i < spine.length - 2; i++) {
        if (horizontal[i]) continue;
        const a = spine[i];
        const b = spine[i + 1];
        const segLen = b.y - a.y;
        if (segLen < 160 * u || Math.abs(b.x - a.x) > 0.5) continue;
        for (let y = a.y + (50 + rand() * 80) * u; y < b.y - 50 * u; y += (120 + rand() * 170) * u) {
          const side = rand() < 0.72 ? sides[0] : sides[1];
          const t = (y - a.y) / segLen;
          const ta = traces[side.trace][i];
          const tb = traces[side.trace][i + 1];
          const start = { x: ta.x + (tb.x - ta.x) * t, y };
          const n = normal(norm(sub(b, a)));
          const dir = { x: n.x * side.outward, y: n.y * side.outward };
          const jog = (12 + rand() * 8) * u;
          const reach = (26 + rand() * 96) * u;
          const elbow = { x: start.x + dir.x * jog, y: start.y + jog };
          let end = { x: elbow.x + dir.x * reach, y: elbow.y };
          end = { x: clampX(end.x), y: end.y };
          const points = [start, elbow, end];
          const lengths = [0, len(sub(elbow, start)), len(sub(elbow, start)) + len(sub(end, elbow))];
          const param = params[i] + (params[i + 1] - params[i]) * t;
          const pick = rand();
          branches.push({
            points,
            lengths,
            total: lengths[2],
            param,
            end: pick < 0.45 ? 'pad' : pick < 0.75 ? 'via' : 'smd',
            dir,
          });
        }
      }
    }

    // text the bus fades behind, measured tight to the glyphs (block boxes span the whole width)
    const range = document.createRange();
    dims = [
      ...document.querySelectorAll(
        '.hero-name, .hero-tagline, .hero-eyebrow, .section-title, .section-intro, .about-text p, .stats, .entry-employer, .entry-title, .entry-description, .entry-date, .project-name, .project-description, .credential-title, .credential-description, .credential-modules, .contact-title, .contact-text',
      ),
    ]
      .map((el) => {
        // width from the glyphs, height from the box: reveal animations shift glyphs vertically
        range.selectNodeContents(el);
        const r = range.getBoundingClientRect();
        const box = el.getBoundingClientRect();
        const sy = window.scrollY;
        return { left: r.left, right: r.right, top: box.top + sy, bottom: box.bottom + sy, width: r.width, height: box.height, cx: 0, cy: 0 };
      })
      .filter((d) => d.width > 0 && d.height > 0);
  };

  /** Point at scroll-parameter s along trace k, and the segment index it falls in. */
  const pointAt = (k: number, s: number): { p: Pt; i: number } => {
    const pts = traces[k];
    if (s <= params[0]) return { p: pts[0], i: 0 };
    if (s >= params[params.length - 1]) return { p: pts[pts.length - 1], i: pts.length - 2 };
    let lo = 0;
    let hi = params.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (params[mid] <= s) lo = mid;
      else hi = mid;
    }
    const span = params[hi] - params[lo] || 1;
    const t = (s - params[lo]) / span;
    const a = pts[lo];
    const b = pts[hi];
    return { p: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }, i: lo };
  };

  const tracePath = (k: number, from: number, to: number) => {
    if (to <= from) return false;
    const a = pointAt(k, from);
    const b = pointAt(k, to);
    ctx.moveTo(a.p.x, a.p.y);
    for (let i = a.i + 1; i <= b.i; i++) ctx.lineTo(traces[k][i].x, traces[k][i].y);
    ctx.lineTo(b.p.x, b.p.y);
    return true;
  };

  /** Where the head is: tied to the scroll so it sits at 2/3 of the screen, compressed if the page ends early. */
  // traces lag 8px behind each other, so the run goes that much further for the last one to plug in
  const finishParam = () => endParam + (traces.length - 1) * 8;

  const headParam = () => {
    if (reducedMotion) return finishParam();
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
    const p = scrollY + HEAD_AT * H;
    const reach = maxScroll + HEAD_AT * H;
    const finish = finishParam();
    if (reach < finish && reach > startParam) return startParam + ((p - startParam) * (finish - startParam)) / (reach - startParam);
    return p;
  };

  const drawGrid = (scrollY: number) => {
    ctx.strokeStyle = `rgba(${ACCENT}, 0.035)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = (grid / 2) % grid; x < W; x += grid) {
      ctx.moveTo(Math.round(x) + 0.5, 0);
      ctx.lineTo(Math.round(x) + 0.5, H);
    }
    for (let y = -(scrollY % grid); y < H; y += grid) {
      ctx.moveTo(0, Math.round(y) + 0.5);
      ctx.lineTo(W, Math.round(y) + 0.5);
    }
    ctx.stroke();
  };

  const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const drawChip = () => {
    if (!chip) return;
    const s = chip.width;
    const x = chip.left;
    const y = chip.top;
    const pulse = reducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(time * 1.8);

    // halo
    const halo = ctx.createRadialGradient(chip.cx, chip.cy, s * 0.1, chip.cx, chip.cy, s * 1.1);
    halo.addColorStop(0, `rgba(${ACCENT}, ${(0.16 + 0.08 * pulse) * power})`);
    halo.addColorStop(1, `rgba(${ACCENT}, 0)`);
    ctx.fillStyle = halo;
    ctx.fillRect(chip.cx - s * 1.2, chip.cy - s * 1.2, s * 2.4, s * 2.4);

    // pins on the four sides; the bottom ones feed the bus
    const pins = mobile ? 4 : 5;
    const pitch = s * 0.16;
    const pinLen = 12;
    ctx.lineWidth = 2;
    ctx.lineCap = 'butt';
    for (let i = 0; i < pins; i++) {
      const o = (i - (pins - 1) / 2) * pitch;
      ctx.strokeStyle = `rgba(${ACCENT}, ${0.25 + 0.45 * power})`;
      ctx.beginPath();
      ctx.moveTo(chip.cx + o, y);
      ctx.lineTo(chip.cx + o, y - pinLen);
      ctx.moveTo(x, chip.cy + o);
      ctx.lineTo(x - pinLen, chip.cy + o);
      ctx.moveTo(x + s, chip.cy + o);
      ctx.lineTo(x + s + pinLen, chip.cy + o);
      ctx.stroke();
      if (!mobile) {
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.5 + 0.5 * power})`;
        ctx.beginPath();
        ctx.moveTo(chip.cx + o, y + s);
        ctx.lineTo(chip.cx + o, y + s + 6);
        ctx.stroke();
      }
    }

    // package
    roundRect(x, y, s, s, s * 0.06);
    ctx.fillStyle = '#101117';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${ACCENT}, ${0.3 + 0.35 * power})`;
    ctx.stroke();

    // die
    const inset = s * 0.2;
    roundRect(x + inset, y + inset, s - inset * 2, s - inset * 2, s * 0.03);
    const die = ctx.createLinearGradient(x, y, x + s, y + s);
    die.addColorStop(0, '#191b2b');
    die.addColorStop(1, '#0d0e14');
    ctx.fillStyle = die;
    ctx.fill();
    ctx.strokeStyle = `rgba(${ACCENT}, ${0.18 + 0.3 * power * (0.7 + 0.3 * pulse)})`;
    ctx.stroke();

    ctx.fillStyle = `rgba(237, 237, 240, ${0.55 + 0.45 * power})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 ${Math.round(s * 0.2)}px "Geist Variable", Inter, sans-serif`;
    ctx.fillText('MT', chip.cx, chip.cy - s * 0.03);
    ctx.fillStyle = `rgba(${ACCENT}, ${0.45 + 0.4 * power})`;
    ctx.font = `400 ${Math.max(8, Math.round(s * 0.055))}px "Geist Mono Variable", ui-monospace, monospace`;
    ctx.fillText(version, chip.cx, chip.cy + s * 0.13);

    // pin-one marker
    ctx.beginPath();
    ctx.arc(x + s * 0.09, y + s * 0.09, s * 0.018, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ACCENT}, ${0.4 + 0.5 * power})`;
    ctx.fill();
  };

  const drawBranches = (p: number) => {
    for (const b of branches) {
      const grown = Math.min(1, (p - b.param) / 140);
      if (grown <= 0) continue;
      const target = b.total * grown;
      ctx.beginPath();
      ctx.moveTo(b.points[0].x, b.points[0].y);
      for (let i = 1; i < b.points.length; i++) {
        if (b.lengths[i] <= target) {
          ctx.lineTo(b.points[i].x, b.points[i].y);
        } else {
          const t = (target - b.lengths[i - 1]) / (b.lengths[i] - b.lengths[i - 1]);
          const a = b.points[i - 1];
          const c = b.points[i];
          ctx.lineTo(a.x + (c.x - a.x) * t, a.y + (c.y - a.y) * t);
          break;
        }
      }
      ctx.strokeStyle = `rgba(${ACCENT}, 0.5)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // junction dot where the branch leaves the bus
      ctx.beginPath();
      ctx.arc(b.points[0].x, b.points[0].y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT}, 0.85)`;
      ctx.fill();

      if (grown < 1) continue;
      const e = b.points[b.points.length - 1];
      ctx.lineWidth = 1.2;
      if (b.end === 'pad') {
        ctx.beginPath();
        ctx.arc(e.x, e.y, 3.4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT}, 0.8)`;
        ctx.stroke();
      } else if (b.end === 'via') {
        ctx.beginPath();
        ctx.arc(e.x, e.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, 0.9)`;
        ctx.fill();
      } else {
        ctx.save();
        ctx.translate(e.x + b.dir.x * 5, e.y);
        ctx.fillStyle = 'rgba(16, 17, 23, 1)';
        ctx.strokeStyle = `rgba(${ACCENT}, 0.75)`;
        ctx.fillRect(-5, -3, 10, 6);
        ctx.strokeRect(-5, -3, 10, 6);
        ctx.restore();
      }
    }
  };

  const drawTraces = (p: number) => {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    // each trace lags slightly behind the one before: the bus wipes in as a staggered ribbon
    const reach = (k: number) => p - k * 8;

    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = `rgba(${ACCENT}, 0.1)`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    traces.forEach((_, k) => tracePath(k, startParam, reach(k)));
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';

    ctx.strokeStyle = `rgba(${ACCENT}, 0.7)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    traces.forEach((_, k) => tracePath(k, startParam, reach(k)));
    ctx.stroke();

    // the freshest part of the bus is still hot
    if (!reducedMotion) {
      for (const [from, to, alpha] of [
        [600, 300, 0.12],
        [300, 120, 0.3],
        [120, 0, 0.65],
      ] as const) {
        ctx.strokeStyle = `rgba(${HOT}, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        traces.forEach((_, k) => tracePath(k, Math.max(startParam, reach(k) - from), reach(k) - to));
        ctx.stroke();
      }
    }

    // terminal pads where the bus plugs into the email
    if (p >= endParam) {
      ctx.fillStyle = `rgba(${HOT}, 0.9)`;
      for (const t of traces) {
        const e = t[t.length - 1];
        ctx.beginPath();
        ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawGlowDot = (x: number, y: number, r: number, alpha: number) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 7);
    g.addColorStop(0, `rgba(${HOT}, ${alpha})`);
    g.addColorStop(0.25, `rgba(${ACCENT}, ${alpha * 0.45})`);
    g.addColorStop(1, `rgba(${ACCENT}, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - r * 7, y - r * 7, r * 14, r * 14);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  };

  const frame = () => {
    if (!running) return;
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    power += (powerTarget - power) * (1 - Math.exp(-dt * 2.5));

    const scrollY = window.scrollY;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    drawGrid(scrollY);

    if (traces.length) {
      const p = Math.min(headParam(), finishParam());
      ctx.save();
      ctx.translate(0, -scrollY);

      drawTraces(p);
      drawBranches(p);

      // fade the board where it runs behind text, with soft edges so traces dim instead of breaking
      ctx.globalCompositeOperation = 'destination-out';
      for (const d of dims) {
        if (d.bottom < scrollY - 30 || d.top > scrollY + H + 30) continue;
        for (const [grow, alpha] of [
          [18, 0.12],
          [10, 0.14],
          [3, 0.2],
        ] as const) {
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          ctx.fillRect(d.left - grow, d.top - grow * 0.6, d.width + grow * 2, d.height + grow * 1.2);
        }
      }

      // the cursor lights the board around it like a torch
      if (pointer.active && !reducedMotion) {
        ctx.globalCompositeOperation = 'source-atop';
        const py = pointer.y + scrollY;
        const torch = ctx.createRadialGradient(pointer.x, py, 0, pointer.x, py, 150);
        torch.addColorStop(0, `rgba(${HOT}, 0.45)`);
        torch.addColorStop(1, `rgba(${HOT}, 0)`);
        ctx.fillStyle = torch;
        ctx.fillRect(pointer.x - 150, py - 150, 300, 300);
      }
      ctx.globalCompositeOperation = 'source-over';

      // the chip goes on top of the text fades and the torch, so neither marks it
      drawChip();

      if (!reducedMotion) {
        // signals keep flowing through the part of the board that is already built
        spawnIn -= dt;
        if (spawnIn <= 0 && p - startParam > 240) {
          spawnIn = 0.28 + Math.random() * 0.35;
          signals.push({ trace: Math.floor(Math.random() * traces.length), s: startParam, speed: 420 + Math.random() * 420 });
        }
        for (let i = signals.length - 1; i >= 0; i--) {
          const sg = signals[i];
          sg.s += sg.speed * dt;
          const limit = p - sg.trace * 8 - 30;
          if (sg.s >= limit) {
            signals.splice(i, 1);
            continue;
          }
          const { p: at } = pointAt(sg.trace, sg.s);
          if (at.y < scrollY - 20 || at.y > scrollY + H + 20) continue;
          drawGlowDot(at.x, at.y, 1.3, 0.75);
        }

        // the head of the bus
        if (p > startParam && p < endParam) {
          for (let k = traces.length - 1; k >= 0; k--) {
            const { p: at } = pointAt(k, p - k * 8);
            if (k === 0) drawGlowDot(at.x, at.y, 3.2, 1);
            else drawGlowDot(at.x, at.y, 1.5, 0.7);
          }
        }
      }
      ctx.restore();

      powered?.classList.toggle('is-powered', p >= endParam - 1);
    }

    requestAnimationFrame(frame);
  };

  const onVisibility = () => {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  rebuild();
  requestAnimationFrame(frame);

  return {
    rebuild,
    setPointer(clientX: number, clientY: number) {
      pointer.x = clientX;
      pointer.y = clientY;
      pointer.active = true;
    },
    powerOn() {
      powerTarget = 1;
    },
    dispose() {
      running = false;
      document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}
