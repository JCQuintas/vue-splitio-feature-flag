export const isSameArray = (array1: unknown[], array2: unknown[]): boolean => {
  if (array1.length !== array2.length) return false

  return array1.every((item) => array2.includes(item))
}
