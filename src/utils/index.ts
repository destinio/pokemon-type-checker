export const toCamelCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/ ([a-z])/g, (_, char: string) => char.toUpperCase())

export const toTrainCase = (str: string) =>
  // replace spaces with hyphens and lowercase everything
  str.toLowerCase().replace(/ /g, '-').toLowerCase()
