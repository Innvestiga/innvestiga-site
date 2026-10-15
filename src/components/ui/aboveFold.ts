// ScrollTrigger's "top 85%" line: a counter whose top is already above it on
// load is in view, so it keeps its server-rendered number instead of
// flashing to 0 and counting back up.
export function startsInView(top: number, viewportHeight: number): boolean {
  return top < viewportHeight * 0.85;
}
