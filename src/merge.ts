export function merge<TA, TB>(valueA: TA, valueB: TB): TA & TB {
  switch (typeof valueA) {
    case 'object':
      if (valueA === null) {
        return valueB as any;
      }
      switch (typeof valueB) {
        case 'undefined':
          return valueA as any;
        case 'object':
          if (valueB === null) {
            return valueA as any;
          }
          return mergeObjects(valueA, valueB);
        default:
          return valueB as any;
      }
    case 'undefined':
      return valueB as any;
    default:
      return (valueA || valueB) as any;
  }
}

function mergeObjects<TA extends {}, TB extends {}>(
  valueA: TA,
  valueB: TB
): TA & TB {
  const keysHash: Record<string, boolean> = {};
  const mergeHash: TA & TB = {} as any;
  Object.keys(valueA).forEach((key) => (keysHash[key] = true));
  Object.keys(valueB).forEach((key) => (keysHash[key] = true));
  Object.keys(keysHash).forEach((key) => {
    mergeHash[key as keyof TA & TB] = merge(
      valueA[key as keyof TA],
      valueB[key as keyof TB]
    ) as any;
  });
  return mergeHash;
}
