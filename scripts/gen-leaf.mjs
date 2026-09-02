/**
 * gen-leaf.mjs — parametric botanical leaf SVG generator.
 * Outline, midrib and vein pairs are computed (not hand-drawn), so
 * proportions are exact and curves smooth. Run: node scripts/gen-leaf.mjs
 */

const L = 170; // leaf length (base→tip), tip at top
const W = 68; // max half-width
const BASE = { x: 100, y: 196 }; // stem attach point in viewBox 200×200
const TIP = { x: 100, y: 196 - L };

const pts = (arr) => arr.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

// Width profile along t∈[0,1]: quick rise from base, long taper to tip.
const widthAt = (t) => W * Math.sin(Math.PI * Math.pow(t, 0.72)) * (1 - 0.08 * t);

const N = 48;
const outlineLeft = [];
const outlineRight = [];
for (let i = 0; i <= N; i++) {
  const t = i / N;
  const y = BASE.y - L * t;
  const w = widthAt(t);
  outlineLeft.push([BASE.x - w, y]);
  outlineRight.push([BASE.x + w, y]);
}
// Very slight tip curvature: shift tip x by -2
outlineLeft[outlineLeft.length - 1] = [TIP.x, TIP.y];
outlineRight[outlineRight.length - 1] = [TIP.x, TIP.y];

// Midrib with gentle S-curve
const midrib = [];
for (let i = 0; i <= 24; i++) {
  const t = i / 24;
  midrib.push([BASE.x + 3 * Math.sin(Math.PI * t), BASE.y - L * t]);
}

// Vein pairs: start on midrib at t_i, sweep up-and-out toward the margin,
// ending short of it, with slight curvature toward the tip.
const veins = [];
const pairs = [0.12, 0.26, 0.4, 0.54, 0.68, 0.8];
for (const t0 of pairs) {
  for (const side of [-1, 1]) {
    const start = [BASE.x + 3 * Math.sin(Math.PI * t0), BASE.y - L * t0];
    const w = widthAt(t0);
    const len = w * 0.82;
    const sweep = 0.42; // upward tilt (rad)
    const tipBias = 0.16 * L * (1 - t0); // curve toward tip
    const end = [start[0] + side * len * Math.cos(sweep), start[1] - len * Math.sin(sweep) - tipBias];
    const ctrl = [
      start[0] + side * len * 0.45 * Math.cos(sweep * 0.4),
      start[1] - len * 0.5 * Math.sin(sweep) - tipBias * 0.15,
    ];
    veins.push({ start, ctrl, end });
  }
}

const veinPath = veins
  .map(({ start, ctrl, end }) => {
    const c1 = [start[0] + (ctrl[0] - start[0]) * 0.7, start[1] + (ctrl[1] - start[1]) * 0.5];
    return `M${pts([start])} C${pts([c1])} ${pts([ctrl])} ${pts([end])}`;
  })
  .join(' ');

const stem = `M${BASE.x - 3},${BASE.y + 2} C${BASE.x - 1},${BASE.y + 8} ${BASE.x - 10},${BASE.y + 12} ${BASE.x - 18},${BASE.y + 10}`;

const svg = `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M${pts(outlineLeft)} L${pts([...outlineRight].reverse())} Z"
    stroke="#2F9E44" stroke-width="2.2" stroke-linejoin="round" fill="#E9F8EE" fill-opacity="0.85"/>
  <path d="M${pts(midrib)}" stroke="#2F9E44" stroke-width="1.6" stroke-linecap="round"/>
  <path d="${veinPath}" stroke="#40A02B" stroke-width="1.1" stroke-linecap="round" opacity="0.85"/>
  <path d="${stem}" stroke="#2F9E44" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;

console.log(svg);
