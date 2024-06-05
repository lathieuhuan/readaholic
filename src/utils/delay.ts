/**
 * @param time default to 1000ms
 */
export function delay(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
