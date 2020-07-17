import React from 'react'

import { Grid } from 'semantic-ui-react'
import { BreakEvenProfileCard, BreakEvenResultsCard, BreakEvenGraph } from '../../molecules'
import './results.less'

const Results = (props) => {
  const { variableCostPerUnit, numUnits, pricePerUnit, totalFixedCost } = props
  const contributionMarginRatio = (pricePerUnit - variableCostPerUnit) / pricePerUnit;
  const breakEvenPointUnits = Math.round(totalFixedCost / (pricePerUnit - variableCostPerUnit))
  const breakEvenPointRevenue = Math.round(totalFixedCost / contributionMarginRatio)

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
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            {/* Table goes here */}
          </Grid.Row>
        </Grid>
      </div>
    </div>
  )
}

export default Results
