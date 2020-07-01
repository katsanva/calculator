export const getEnumValues = (enumerable: any) =>
  Object.keys(enumerable)
    .filter((v: string) => isNaN(parseInt(v, 10)))
    .map((v: string) => enumerable[v]);
