import React, {useEffect} from 'react'

import { Container, Grid, Button } from 'semantic-ui-react'
import { 
  BreakEvenProfileCard, 
  BreakEvenResultsCard, 
  BreakEvenGraph, 
  BreakEvenDataTable, 
  BecAccordion 
} from '../../molecules'
import { findStepSize } from '../../../helpers'
import { FAQ_CONTENT, CALCULATOR_STEPS } from '../../../constants'

import './results.less'

export const generateDataTableRow = (data) => {
  const { units, pricePerUnit, variableCostPerUnit, fixedCost } = data

  const revenue = Math.round(units * pricePerUnit);
  const totalVariableCost = Math.round(variableCostPerUnit * units);

  return {
    units: units,
    profit: revenue - totalVariableCost - fixedCost,
    revenue: revenue,
    variableCosts: totalVariableCost,
    fixedCosts: fixedCost,
  }
}

export const generateTableData = (breakEvenPointUnits, pricePerUnit, variableCostPerUnit, fixedCost) => {
  const stepSize = findStepSize(breakEvenPointUnits)
  const tableData = []

  // generate points around BEP
  for(let i = 0; i < 8; i++) {
    tableData.push(generateDataTableRow({
      units: stepSize * i, 
      pricePerUnit,
      variableCostPerUnit,
      fixedCost,
    }))
    if(stepSize * i < breakEvenPointUnits && (stepSize * (i+1)) > breakEvenPointUnits) {
      // push BEP data into the generated table
      tableData.push({
        units: breakEvenPointUnits,
        profit: 0,
        revenue: Math.round(breakEvenPointUnits * pricePerUnit),
        variableCosts: Math.round(variableCostPerUnit * breakEvenPointUnits),
        fixedCosts: fixedCost,
      })
    }
  }

  return tableData;
}

const Results = (props) => {
  const { variableCostPerUnit, numUnits, pricePerUnit, totalFixedCost } = props

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const contributionMarginRatio = (pricePerUnit - variableCostPerUnit) / pricePerUnit;
  const breakEvenPointUnits = Math.round(totalFixedCost / (pricePerUnit - variableCostPerUnit))
  const breakEvenPointRevenue = Math.round(totalFixedCost / contributionMarginRatio)

  const tableData = generateTableData(breakEvenPointUnits, parseInt(pricePerUnit), parseInt(variableCostPerUnit), parseInt(totalFixedCost));

  return (
    <>
    <div className='resultsContainer'>
      <div className='gradientBackground'>
        <h1>Break-Even Point Results</h1>
      </div>
      <div className='dataCards-container'>
        <Grid stackable>
          <Grid.Row className='topRow' columns={2} stretched>
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
                variableCostPerUnit={variableCostPerUnit}
                numUnits={numUnits}
                pricePerUnit={pricePerUnit}
                totalFixedCost={totalFixedCost}
                updateFixedCost={props.updateFixedCost}
                updateNumUnits={props.updateNumUnits}
                updatePricePerUnit={props.updatePricePerUnit}
                updateVariableCost={props.updateVariableCost}
              />
            </Grid.Column>
          </Grid.Row>
          {parseFloat(variableCostPerUnit) < parseFloat(pricePerUnit) && 
          <Grid.Row className='graphRow' columns={1}>
            <Grid.Column>
              <BreakEvenGraph 
                breakEvenUnits={breakEvenPointUnits}
                breakEvenSales={breakEvenPointRevenue}
                fixedCost={totalFixedCost}
                variableCost={variableCostPerUnit}
                expectedUnits={numUnits}
              />
            </Grid.Column>
          </Grid.Row>}
          <Grid.Row className='tableRow' columns={1}>
            <Grid.Column>
              <BreakEvenDataTable data={tableData}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
      <Container id='printCTA'>
        <h3>Next Steps</h3>
        <p>Print this dashboard for your reference to add to your business plan or to share with a consultant.</p>
        <Button color='red' onClick={() => window.print()}>Print Results</Button>
      </Container>
      <Container id='faqAccordion'>
        <BecAccordion data={FAQ_CONTENT[CALCULATOR_STEPS.RESULTS_PAGE] || []}/>
      </Container>
    </>
  )
}

export default Results
