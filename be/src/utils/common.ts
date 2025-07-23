type ObjectKeysList<T extends object> = (keyof T)[];

export function pick<T extends object, K extends ObjectKeysList<T>>(
  data: T,
  pickKeys: K,
): Pick<T, K[number]> {
  return Object.fromEntries(
    Object.entries(data).filter((entry) => {
      const key = entry[0] as keyof T;

      return pickKeys.includes(key) && data[key] !== null;
    }),
  ) as Pick<T, K[number]>;
}

export function omit<T extends object, K extends ObjectKeysList<T>>(
  data: T,
  omitKeys: K,
): Omit<T, K[number]> {
  return Object.fromEntries(
    Object.entries(data).filter((entry) => {
      const key = entry[0] as keyof T;

      return !omitKeys.includes(key) && data[key] !== null;
    }),
  ) as Omit<T, K[number]>;
}

export function setUpdatedAt<T extends Record<string, unknown>>(entity: T): T {
  return {
    ...entity,
    updatedAt: new Date(),
  };
}

export function takeFirst<T extends Array<unknown>>(list: T): T[number] {
  return list[0];
}
