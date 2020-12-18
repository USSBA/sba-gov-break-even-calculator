import React from 'react'
import { render, screen } from '@testing-library/react';
import { Results } from '../../organisms'
window.scrollTo = jest.fn();

describe('BreakEvenGraph', () => {

  beforeAll(() => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)
  });

  test('renders breakeven graph', () => {
    screen.getByTestId('graph')
  })

  test('includes all labels for the graph', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)

    screen.getByRole("img", { name: /unit sales label/i });
    screen.getByRole("img", { name: /total cost label/i });
    screen.getByRole("img", { name: /fixed cost label/i });
    screen.getByRole("img", { name: /breakeven point label/i });
  })

  test('includes unit label bottom of x axis', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)
    
    screen.getAllByText("Units Sold")[0];
  })

  test('includes 4 lines', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)
    
    screen.getByTestId('unit-sold')
  })

  test('includes a message for screen readers', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)

    screen.getByRole("img", {
      name: /this image is a line graph representation of the break even point at 77 units sold and the data table below/i,
    });
  })

  test('includes a label stating how many units sold to break even', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)
    
    screen.getAllByText("77")[1];
  })

  test('contains a description of the graph', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)

    screen.getByText(
      "Graphical representation of your inputs. Click or tap in the graph for detailed values."
    );
  })

  test('contains a title of the graph', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)

    screen.getByRole("heading", { name: /break-even point graph/i })
  })

  test('includes a graph icon', () => {
    render(<Results 
      variableCostPerUnit='12'
      numUnits='200'
      pricePerUnit='25'
      totalFixedCost='1000'
      updateFixedCost={jest.fn()}
      updateNumUnits={jest.fn()}
      updatePricePerUnit={jest.fn()}
      updateVariableCost={jest.fn()} 
    />)

    screen.getByRole("img", { name: /graph icon/i });
  })
})