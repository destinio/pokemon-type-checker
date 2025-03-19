import { describe, expect, it } from 'vitest'
import { getPokemonRegion, getTypeByName } from '@/utils/pokemonUtils'
import { isValidElement } from 'react'

describe('PokemonUtils', () => {
  describe('getTypeByName', () => {
    it('should return the correct type data', () => {
      const typeInfo = getTypeByName('fire')

      expect(Object.keys(typeInfo)).toEqual(['type', 'color', 'icon'])
    })

    it('shoudld return the correct data types', () => {
      const typeInfo = getTypeByName('fire')

      expect(typeInfo.type).toBe('fire')
      expect(typeInfo.color).toBe('#FF4522')
      expect(isValidElement(typeInfo.icon)).toBe(true)
    })

    it('should return the default type if the type is not found', () => {
      const typeInfo = getTypeByName('blahblah')

      expect(typeInfo.type).toBe('normal')
      expect(typeInfo.color).toBe('#CC9')
      expect(isValidElement(typeInfo.icon)).toBe(true)
    })
  })

  describe('getPokemonRegion', () => {
    it('should retun kanto for 1', () => {
      const region = getPokemonRegion(1)
      expect(region).toBe('kanto')
    })

    it('should return johto for 152', () => {
      const region = getPokemonRegion(152)
      expect(region).toBe('johto')
    })
  })
})
