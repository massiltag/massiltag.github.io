/** The minimal page shown while the site is disabled: the chip glowing alone, its traces cut short. */
import { ACCENT, careerVersion, drawChip } from './chip';

interface Pt {
  x: number;
  y: number;
}

const canvas = document.getElementById('offline') as HTMLCanvasElement | null;
const link = document.querySelector<HTMLAnchorElement>('.chip-link');
const ctx = canvas?.getContext('2d');

if (canvas && ctx) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const version = careerVersion();
  const PINS = 5;
  let W = 0;
  let H = 0;
  let size = 150;
  let stubs: Pt[][] = [];
  let power = reduced ? 1 : 0;
  let hover = 0;
  let hoverTarget = 0;
  let last = performance.now();
  let time = 0;

  /** Pins trail off into short PCB traces (straight, 45° jog, straight) that fade into the dark. */
  const buildStubs = () => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const cx = W / 2;
    const cy = H / 2;
    const half = size / 2;
    const pitch = size * 0.16;
    const out: Pt[][] = [];
    const sides = [
      { dir: { x: 0, y: 1 }, across: { x: 1, y: 0 } },
      { dir: { x: 0, y: -1 }, across: { x: 1, y: 0 } },
      { dir: { x: 1, y: 0 }, across: { x: 0, y: 1 } },
      { dir: { x: -1, y: 0 }, across: { x: 0, y: 1 } },
    ];
    for (const { dir, across } of sides) {
      for (let i = 0; i < PINS; i++) {
        const o = (i - (PINS - 1) / 2) * pitch;
        const start = { x: cx + dir.x * (half + 12) + across.x * o, y: cy + dir.y * (half + 12) + across.y * o };
        const first = size * (0.18 + rand() * 0.35);
        const p1 = { x: start.x + dir.x * first, y: start.y + dir.y * first };
        // outer pins splay outward, the middle one keeps going straight
        const splay = Math.sign(o);
        const jog = size * 0.16 * Math.abs(splay);
        const p2 = { x: p1.x + dir.x * jog + across.x * jog * splay, y: p1.y + dir.y * jog + across.y * jog * splay };
        const second = size * (0.25 + rand() * 0.55);
        const p3 = { x: p2.x + dir.x * second, y: p2.y + dir.y * second };
        out.push([start, p1, p2, p3]);
      }
    }
    return out;
  };

  const resize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    size = Math.round(Math.min(160, Math.max(110, Math.min(W, H) * 0.17)));
    link?.style.setProperty('--chip-size', `${size}px`);
    stubs = buildStubs();
  };

  const drawGrid = () => {
    const step = 32;
    ctx.strokeStyle = `rgba(${ACCENT}, 0.035)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const ox = (W / 2) % step;
    const oy = (H / 2) % step;
    for (let x = ox; x < W; x += step) {
      ctx.moveTo(Math.round(x) + 0.5, 0);
      ctx.lineTo(Math.round(x) + 0.5, H);
    }
    for (let y = oy; y < H; y += step) {
      ctx.moveTo(0, Math.round(y) + 0.5);
      ctx.lineTo(W, Math.round(y) + 0.5);
    }
    ctx.stroke();
  };

  const drawStubs = (glow: number) => {
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const pts of stubs) {
      const a = pts[0];
      const b = pts[pts.length - 1];
      const fade = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      fade.addColorStop(0, `rgba(${ACCENT}, ${0.55 * glow})`);
      fade.addColorStop(1, `rgba(${ACCENT}, 0)`);
      ctx.strokeStyle = fade;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      for (const p of pts.slice(1)) ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  };

  const frame = () => {
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;
    if (!reduced) power += (1 - power) * (1 - Math.exp(-dt * 1.6));
    hover += (hoverTarget - hover) * (1 - Math.exp(-dt * 8));

    const pulse = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(time * 1.6);
    const glow = power * (1 + hover * 0.5);

    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawStubs(glow);
    drawChip(ctx, { x: (W - size) / 2, y: (H - size) / 2, size }, { power: glow, pulse, pins: PINS, feedPins: false, version });

    requestAnimationFrame(frame);
  };

  link?.addEventListener('pointerenter', () => (hoverTarget = 1));
  link?.addEventListener('pointerleave', () => (hoverTarget = 0));
  link?.addEventListener('focus', () => (hoverTarget = 1));
  link?.addEventListener('blur', () => (hoverTarget = 0));
  window.addEventListener('resize', resize);
  resize();
  // the chip label is drawn in Geist on the canvas: make sure the fonts are actually loaded
  void Promise.all([document.fonts.load('700 20px "Geist Variable"'), document.fonts.load('400 10px "Geist Mono Variable"')]);
  requestAnimationFrame(frame);
}
