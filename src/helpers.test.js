import { findStepSize } from './helpers'

describe('findStepSize', () => {
  it('Returns a prettified step size', () => {
    expect(findStepSize(5)).toBe(1)
    expect(findStepSize(9)).toBe(5)
    expect(findStepSize(1403)).toBe(400)
    expect(findStepSize(120056)).toBe(30000)
  })

  it('Handles exceptions well', () => {
    expect(findStepSize(0)).toBe(1)
    expect(findStepSize(-12)).toBe(1)
    expect(findStepSize(100.6)).toBe(30)
  })
})