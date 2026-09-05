/**
 * A CSS-style cubic-bezier easing: the curve from (0,0) to (1,1) with control
 * points (x1,y1) and (x2,y2), read as time → progress. Like CSS, the curve may
 * overshoot (y beyond 1) for a soft settle at the end.
 *
 * Returns progress for a time in [0, 1]. The curve is parametric, so the time
 * is first solved for the curve parameter with a few Newton steps, then
 * bisection for the stubborn cases.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
  const ax = 3 * x1 - 3 * x2 + 1, bx = 3 * x2 - 6 * x1, cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1, by = 3 * y2 - 6 * y1, cy = 3 * y1;
  const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sampleY = (u: number) => ((ay * u + by) * u + cy) * u;
  const slopeX = (u: number) => (3 * ax * u + 2 * bx) * u + cx;

  return (t: number): number => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    let u = t;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(u) - t;
      if (Math.abs(dx) < 1e-6) return sampleY(u);
      const slope = slopeX(u);
      if (Math.abs(slope) < 1e-6) break;
      u -= dx / slope;
    }

    let lo = 0, hi = 1;
    u = t;
    while (hi - lo > 1e-6) {
      u = (lo + hi) / 2;
      if (sampleX(u) < t) lo = u; else hi = u;
    }
    return sampleY(u);
  };
}
