import { describe, it, expect } from 'vitest'
import { toCamelCase, toTrainCase } from '.'

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
})

