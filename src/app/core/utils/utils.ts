export function cleanObject<T>(obj: { [K in keyof T]: T[keyof T] }): Partial<T> {
  const cleanedObj: Partial<T> = {};

  for (const [key, value] of Object.entries<T[keyof T]>(obj)) {
    if (typeof value !== 'undefined' && value !== null) {
      // @ts-ignore
      cleanedObj[key] = value;
    }
  }

  return cleanedObj;
}
