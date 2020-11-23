export let rad = Math.PI / 180;
export let _rad = 180 / Math.PI;

export function interpolate(n1: number, n2: number, p: number) {
  return n1 + (n2 - n1) * p;
}

export function rand(n1: number, n2: number, rnd: boolean = false) {
  if (!n2) {
    n2 = n1;
    n1 = 0;
  }
  const n = n1 + Math.random() * (n2 - n1);
  // tslint:disable-next-line: no-bitwise
  return rnd ? (n + 0.5) | 0 : n;
}

export function clamp(n: number, mn: number, mx: number) {
  if (mn < mx) {
    return Math.max(mn, Math.min(mx, n));
  } else {
    return Math.max(mx, Math.min(mn, n));
  }
}
