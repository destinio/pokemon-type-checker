import { describe, expect, it } from 'vitest'
import { getTypeByName } from './pokemonTypes'

describe('utiles/types', () => {
  it('should return the correct type data', () => {
    const data = getTypeByName('fire')

    const badData = {
      ...data,
      love: 'fire',
    }

    // test that the correct keys are present
    expect(Object.keys(data)).toEqual(['type', 'color', 'icon'])
  })
})
