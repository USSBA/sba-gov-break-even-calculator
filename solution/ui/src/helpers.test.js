import { findStepSize, formatBreakEvenGraphData, sumValues } from './helpers'
import { fixedCostInitState } from './components/organisms/fixedCosts/fixedCostsFieldsData'

describe('sumValues', () => {
  it('Returns an empty string when there are no values', () => {
    expect(sumValues(fixedCostInitState)).toEqual('')
  })

  it('Returns single value if only one field is not empty', () => {
    const newObj = {...fixedCostInitState, Rent: '400'}
    expect(sumValues(newObj)).toEqual('400')
  })

  it('Correctly adds all non-empty fields', () => {
    const newObj = {...fixedCostInitState, Rent: '600', Insurance: '400'}
    expect(sumValues(newObj)).toEqual(1000)
  })

  it('Corectly handles zero', () => {
    const newObj = {...fixedCostInitState, Rent: '0'}
    expect(sumValues(newObj)).toEqual('0')
    expect(sumValues({...newObj, Insurance: '0'})).toEqual(0)
  })
})

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
        ],
        label: 'Break-Even Point'
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
        lineColor: '#007dbc',
        data: [ 
          { x: 100, y: 0 },
          { x: 100, y: 4000 }
        ],
        label: 'Break Even'
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
      "unitSales": { 
        "data": [
          {"x": 0, "y": 0}, 
          {"x": 200, "y": 4000}], 
        "label": "Unit Sales",
        "lineColor": "#00518B", 
        "shape": "Square", 
        "stroke": "5,10"
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
      "totalCost": {
        "data": [
          {"x": 0, "y": 1000}, 
          {"x": 200, "y": 3000}], 
        "label": "Total Cost", 
        "lineColor": "#197E4E", 
        "shape": "Diamond", 
        "stroke": "10,10"
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
      "fixedCost": {
        "data": [
          {"x": 0, "y": 1000}, 
          {"x": 200, "y": 1000}], 
        "label": "Fixed Cost", 
        "lineColor": "#FF4F30", 
        "shape": "Triangle", 
        "stroke": "5,5"
      }
      
    }))
  })
})