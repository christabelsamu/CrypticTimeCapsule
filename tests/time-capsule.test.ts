import { describe, it, expect, beforeEach } from 'vitest'

// Mock the contract state
let capsules = new Map()
let nextCapsuleId = 0

// Mock contract functions
function createCapsule(message: string, unlockTime: number) {
  const capsuleId = nextCapsuleId++
  capsules.set(capsuleId, {
    owner: 'current-user',
    message,
    unlockTime,
    isUnlocked: false
  })
  return capsuleId
}

function unlockCapsule(capsuleId: number, currentTime: number) {
  const capsule = capsules.get(capsuleId)
  if (!capsule) {
    throw new Error('Capsule not found')
  }
  if (capsule.owner !== 'current-user') {
    throw new Error('Not the owner')
  }
  if (capsule.isUnlocked) {
    throw new Error('Already unlocked')
  }
  if (currentTime < capsule.unlockTime) {
    throw new Error('Too early to unlock')
  }
  capsule.isUnlocked = true
  return true
}

function getCapsule(capsuleId: number) {
  return capsules.get(capsuleId)
}

describe('time-capsule', () => {
  beforeEach(() => {
    capsules.clear()
    nextCapsuleId = 0
  })
  
  it('can create a new capsule', () => {
    const capsuleId = createCapsule('Hello, future!', 100)
    expect(capsuleId).toBe(0)
    const capsule = getCapsule(capsuleId)
    expect(capsule).toBeDefined()
    expect(capsule?.message).toBe('Hello, future!')
    expect(capsule?.unlockTime).toBe(100)
    expect(capsule?.isUnlocked).toBe(false)
  })
  
  it('cannot unlock a capsule before time', () => {
    const capsuleId = createCapsule('Hello, future!', 100)
    expect(() => unlockCapsule(capsuleId, 99)).toThrow('Too early to unlock')
  })
  
  it('can unlock a capsule after time', () => {
    const capsuleId = createCapsule('Hello, future!', 100)
    expect(unlockCapsule(capsuleId, 100)).toBe(true)
    const capsule = getCapsule(capsuleId)
    expect(capsule?.isUnlocked).toBe(true)
  })
  
  it('cannot unlock a capsule twice', () => {
    const capsuleId = createCapsule('Hello, future!', 100)
    unlockCapsule(capsuleId, 100)
    expect(() => unlockCapsule(capsuleId, 101)).toThrow('Already unlocked')
  })
  
  it('cannot unlock a non-existent capsule', () => {
    expect(() => unlockCapsule(999, 100)).toThrow('Capsule not found')
  })
})

