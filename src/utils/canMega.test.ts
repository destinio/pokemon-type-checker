import { describe, expect, it } from 'vitest'
import { canMega } from './canMega'

describe('Utils - Megas', () => {
  it('should return true for blaziken', () => {
    const result = canMega('blaziken')
    expect(result).toBe(true)
  })

  it('should return true for blaziken with different case', () => {
    const result = canMega('Blaziken')
    expect(result).toBe(true)
  })

  it('should return false for a non-mega pokemon', () => {
    const result = canMega('pikachu')
    expect(result).toBe(false)
  })
})
