export const stringToBoolean = (str: string): boolean =>
  str === "1" ? true : str === "0" ? false : undefined;

export const booleanToString = (str: boolean): string =>
  str === true ? "1" : str === false ? "0" : undefined;

export const numberToStringDecimal = (num: number) =>
  num?.toString().replace(".", ",");

export const stringDecimalToNumber = (str: string) =>
  str === "0" ? Number(str) : Number(str?.replace(",", ".")) || null;

export const stringNaoVaziaOuUndefined = (value: string) => {
  let valor = value ? value.toString() : undefined;
  return valor && valor.length > 0 ? valor : undefined;
};
