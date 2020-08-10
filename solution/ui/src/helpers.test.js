import { findStepSize, formatBreakEvenGraphData } from './helpers'

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

describe('formatBreakEvenGraphData', () => {
  it('correctly formats break even point data', () => {
    const formattedData = formatBreakEvenGraphData({
      breakEvenUnits: '100', 
      breakEvenSales: '2000',
      variableCost: '10',
      fixedCost: '1000'
    })
    expect(formattedData).toEqual(expect.objectContaining({
      breakEvenPoint: {
        color: "#007dbc",
        data: [
          {  x: 100, y: 2000 }
        ]
      }
    }))
  })

  it('correctly formats break even line data', () => {
    const formattedData = formatBreakEvenGraphData({
      breakEvenUnits: '100', 
      breakEvenSales: '2000',
      variableCost: '10',
      fixedCost: '1000'
    })
    expect(formattedData).toEqual(expect.objectContaining({
      breakEven: {
        lineColor: "#007dbc",
        data: [ 
          { x: 100, y: 0 },
          { x: 100, y: 4000 }
        ],
      },
    }))
  })

  it('correctly formats unit sales data', () => {
    const formattedData = formatBreakEvenGraphData({
      breakEvenUnits: '100', 
      breakEvenSales: '2000',
      variableCost: '10',
      fixedCost: '1000'
    })
    expect(formattedData).toEqual(expect.objectContaining({
      unitSales: {
        lineColor: '#41569C',
        data: [ 
          { x: 0, y: 0 },
          { x: 200, y: 4000 }
        ]
      }
    }))
  })

  it('correctly formats total cost data', () => {
    const formattedData = formatBreakEvenGraphData({
      breakEvenUnits: '100', 
      breakEvenSales: '2000',
      variableCost: '10',
      fixedCost: '1000'
    })
    expect(formattedData).toEqual(expect.objectContaining({
      totalCost: {
        lineColor: '#686868',
        data: [ 
          { x: 0, y: 1000 },
          { x: 200, y: 3000 }
        ]
      }
    }))
  })

  it('correctly formats fixed cost data', () => {
    const formattedData = formatBreakEvenGraphData({
      breakEvenUnits: '100', 
      breakEvenSales: '2000',
      variableCost: '10',
      fixedCost: '1000'
    })
    expect(formattedData).toEqual(expect.objectContaining({
      fixedCost: {
        lineColor: '#969696',
        data: [ 
          { x: 0, y: 1000},
          { x: 200, y: 1000}
        ]
      }
    }))
  })
})