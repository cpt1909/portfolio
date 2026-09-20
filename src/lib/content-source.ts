/** Sample content is explicit opt-in, never an error fallback. */
export async function selectContentSource<T>(flag: string | undefined, database: () => Promise<T>, sample: () => Promise<T>): Promise<T> {
  return flag === 'true' ? sample() : database();
}
