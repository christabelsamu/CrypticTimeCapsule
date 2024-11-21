import { describe, it, expect, beforeEach } from 'vitest'

// Mock contract state
let btcPrice = 0
const contractOwner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'

// Mock contract functions
function setBtcPrice(price: number, sender: string) {
  if (sender !== contractOwner) {
    throw new Error('Unauthorized')
  }
  btcPrice = price
  return true
}

function getBtcPrice() {
  return btcPrice
}

describe('bitcoin-price-oracle', () => {
  beforeEach(() => {
    btcPrice = 0
  })
  
  it('allows contract owner to set BTC price', () => {
    expect(setBtcPrice(50000, contractOwner)).toBe(true)
    expect(getBtcPrice()).toBe(50000)
  })
  
  it('does not allow non-owner to set BTC price', () => {
    expect(() => setBtcPrice(50000, 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'))
        .toThrow('Unauthorized')
    expect(getBtcPrice()).toBe(0)
  })
  
  it('can get BTC price', () => {
    setBtcPrice(45000, contractOwner)
    expect(getBtcPrice()).toBe(45000)
  })
  
  it('returns 0 when price is not set', () => {
    expect(getBtcPrice()).toBe(0)
  })
  
  it('can update BTC price multiple times', () => {
    expect(setBtcPrice(50000, contractOwner)).toBe(true)
    expect(getBtcPrice()).toBe(50000)
    
    expect(setBtcPrice(55000, contractOwner)).toBe(true)
    expect(getBtcPrice()).toBe(55000)
  })
  
  it('handles large BTC prices', () => {
    const largePrice = 1000000000 // 1 billion
    expect(setBtcPrice(largePrice, contractOwner)).toBe(true)
    expect(getBtcPrice()).toBe(largePrice)
  })
  
  it('handles zero BTC price', () => {
    expect(setBtcPrice(0, contractOwner)).toBe(true)
    expect(getBtcPrice()).toBe(0)
  })
})

