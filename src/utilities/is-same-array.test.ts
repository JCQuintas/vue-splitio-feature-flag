import { isSameArray } from './is-same-array'

test.each([
  [
    ['1', '2'],
    ['1', '2'],
  ],
  [
    ['a', 'b', 'c', 'd'],
    ['d', 'c', 'b', 'a'],
  ],
  [
    [1, 3, 'test'],
    [3, 1, 'test'],
  ],
  [[], []],
])(
  'it should return true when arrays contain the same values %#',
  (arr1, arr2) => {
    expect(isSameArray(arr1, arr2)).toBe(true)
  },
)

test.each([
  [
    ['1', '2'],
    ['1', '3'],
  ],
  [
    ['a', 'b', 'c', 'd'],
    ['z', 'y', 'x', 'w'],
  ],
  [
    [1, 3, 'test'],
    [3, 1],
  ],
  [[undefined], [null]],
])(
  'it should return false when arrays do not contain the same values %#',
  (arr1, arr2) => {
    expect(isSameArray(arr1, arr2)).toBe(false)
  },
)
