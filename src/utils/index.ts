export const toCamelCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/ ([a-z])/g, (_, char: string) => char.toUpperCase())

export function toTrainCase(str: string): string {
  return str.toLowerCase().replace(/\'/g, '').replace(/ /g, '-')
}

export function isInt(value: string | number): boolean {
  return !isNaN(Number(value)) && Number.isInteger(Number(value))
}
