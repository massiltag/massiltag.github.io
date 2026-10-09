/** The "MT" chip, shared by the circuit on the full site and the minimal (disabled) page. */

export const ACCENT = '124, 140, 255';

const CAREER_START_YEAR = 2019;

/** The chip's "firmware version": years since 2019, bumped every January 1st. */
export const careerVersion = () => `v${new Date().getFullYear() - CAREER_START_YEAR}.0`;

export interface ChipBox {
  x: number;
  y: number;
  size: number;
}

export interface ChipLook {
  /** 0 → 1, how "switched on" the chip looks */
  power: number;
  /** 0 → 1, the breathing of the core */
  pulse: number;
  /** pins per side */
  pins: number;
  /** extra stubs under the bottom pins, where the bus plugs in */
  feedPins: boolean;
  version: string;
}

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

export function drawChip(ctx: CanvasRenderingContext2D, { x, y, size: s }: ChipBox, { power, pulse, pins, feedPins, version }: ChipLook) {
  const cx = x + s / 2;
  const cy = y + s / 2;

  // halo
  const halo = ctx.createRadialGradient(cx, cy, s * 0.1, cx, cy, s * 1.1);
  halo.addColorStop(0, `rgba(${ACCENT}, ${(0.16 + 0.08 * pulse) * power})`);
  halo.addColorStop(1, `rgba(${ACCENT}, 0)`);
  ctx.fillStyle = halo;
  ctx.fillRect(cx - s * 1.2, cy - s * 1.2, s * 2.4, s * 2.4);

  // pins on the four sides
  const pitch = s * 0.16;
  const pinLen = 12;
  ctx.lineWidth = 2;
  ctx.lineCap = 'butt';
  for (let i = 0; i < pins; i++) {
    const o = (i - (pins - 1) / 2) * pitch;
    ctx.strokeStyle = `rgba(${ACCENT}, ${0.25 + 0.45 * power})`;
    ctx.beginPath();
    ctx.moveTo(cx + o, y);
    ctx.lineTo(cx + o, y - pinLen);
    ctx.moveTo(x, cy + o);
    ctx.lineTo(x - pinLen, cy + o);
    ctx.moveTo(x + s, cy + o);
    ctx.lineTo(x + s + pinLen, cy + o);
    ctx.stroke();
    if (feedPins) {
      ctx.strokeStyle = `rgba(${ACCENT}, ${0.5 + 0.5 * power})`;
      ctx.beginPath();
      ctx.moveTo(cx + o, y + s);
      ctx.lineTo(cx + o, y + s + 6);
      ctx.stroke();
    }
  }

  // package
  roundRect(ctx, x, y, s, s, s * 0.06);
  ctx.fillStyle = '#101117';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${ACCENT}, ${0.3 + 0.35 * power})`;
  ctx.stroke();

  // die
  const inset = s * 0.2;
  roundRect(ctx, x + inset, y + inset, s - inset * 2, s - inset * 2, s * 0.03);
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
  ctx.fillText('MT', cx, cy - s * 0.03);
  ctx.fillStyle = `rgba(${ACCENT}, ${0.45 + 0.4 * power})`;
  ctx.font = `400 ${Math.max(8, Math.round(s * 0.055))}px "Geist Mono Variable", ui-monospace, monospace`;
  ctx.fillText(version, cx, cy + s * 0.13);

  // pin-one marker
  ctx.beginPath();
  ctx.arc(x + s * 0.09, y + s * 0.09, s * 0.018, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${ACCENT}, ${0.4 + 0.5 * power})`;
  ctx.fill();
}
