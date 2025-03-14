import { describe, it, expect } from 'vitest'
import { isInt, toCamelCase, toTrainCase } from '.'

const tests = [
  {
    description: 'it should convert a string to camel case',
    input: 'job shmoe',
    expected: 'jobShmoe',
  },
  {
    description: 'it should not a change a single word string',
    input: 'job',
    expected: 'job',
  },
]

describe('utils', () => {
  describe('toCamelCase', () => {
    tests.forEach(({ description, input, expected }) => {
      it(description, () => {
        expect(toCamelCase(input)).toBe(expected)
      })
    })
  })

  describe('toTrainCase', () => {
    it('should convert a string to train case', () => {
      expect(toTrainCase('job shmoe')).toBe('job-shmoe')
    })
  })

  describe('isInt', () => {
    it('should return true for string integers', () => {
      expect(isInt('1')).toBe(true)
      expect(isInt('0')).toBe(true)
      expect(isInt('-1')).toBe(true)
    })

    it('should return true for number integers', () => {
      expect(isInt(1)).toBe(true)
      expect(isInt(0)).toBe(true)
      expect(isInt(-1)).toBe(true)
    })

    it('should return false for non-integers', () => {
      expect(isInt('job')).toBe(false)
    })
  })
})
