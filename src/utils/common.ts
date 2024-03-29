export function StopEvent(e: any) {
  e.preventDefault && e.preventDefault();
  e.stopPropagation && e.stopPropagation();
}

/** `true` if app is being rendered on a browser, else `false` if it's server-side rendering */
export const IsCSR = typeof window !== 'undefined';

/** `true` if viewport width is smaller than or equal to 600 */
export const isMobile = IsCSR && window.innerWidth <= 600;

export async function SafePromise<T>(fn: () => Promise<T>) {
  return fn().catch(() => Promise.resolve(undefined));
}
