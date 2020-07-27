import React from 'react'

import { Grid } from 'semantic-ui-react'
import { BreakEvenProfileCard, BreakEvenResultsCard, BreakEvenGraph, BreakEvenDataTable } from '../../molecules'
import { findStepSize } from '../../../helpers'

import './results.less'

const generateDataTableRow = (data) => {
  const {units, pricePerUnit, variableCostPerUnit, fixedCost } = data

  const revenue = Math.round(units * pricePerUnit);
  const totalVariableCost = Math.round(variableCostPerUnit * units);

  return {
    units: units,
    profit: revenue - totalVariableCost - fixedCost,
    revenue: revenue,
    variableCost: totalVariableCost,
    fixedCost: fixedCost,
  }
}

const generateTableData = (breakEvenPointUnits, pricePerUnit, variableCostPerUnit, fixedCost) => {
  const stepSize = findStepSize(breakEvenPointUnits)
  const tableData = []
  for(let i = 1; i < 9; i++) {
    tableData.push(generateDataTableRow({
      units: stepSize * i, 
      pricePerUnit,
      variableCostPerUnit,
      fixedCost,
    }))
  }
  return tableData;
}

const Results = (props) => {
  const { variableCostPerUnit, numUnits, pricePerUnit, totalFixedCost } = props

  const contributionMarginRatio = (pricePerUnit - variableCostPerUnit) / pricePerUnit;
  const breakEvenPointUnits = Math.round(totalFixedCost / (pricePerUnit - variableCostPerUnit))
  const breakEvenPointRevenue = Math.round(totalFixedCost / contributionMarginRatio)

  const tableData = generateTableData(breakEvenPointUnits, parseInt(pricePerUnit), parseInt(variableCostPerUnit), totalFixedCost);
  console.log(tableData)

  return (
    <div className='resultsContainer'>
      <div className='gradientBackground'></div>
      <div className='dataCards-container'>
        <Grid stackable>
          <Grid.Row columns={2} stretched>
            <Grid.Column>
              <BreakEvenResultsCard 
                expectedUnits={numUnits}
                breakEvenUnits={breakEvenPointUnits}
                breakEvenRevenue={breakEvenPointRevenue}
                pricePerUnit={pricePerUnit}
                variableCost={variableCostPerUnit}
                fixedCost={totalFixedCost}
              />
            </Grid.Column>
            <Grid.Column>
              <BreakEvenProfileCard 
                breakEvenUnits={breakEvenPointUnits}
                breakEvenSales={breakEvenPointRevenue}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <BreakEvenGraph 
                breakEvenUnits={breakEvenPointUnits}
                breakEvenSales={breakEvenPointRevenue}
                fixedCost={totalFixedCost}
                variableCost={variableCostPerUnit}
                expectedUnits={numUnits}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <BreakEvenDataTable />
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}

export default Results
