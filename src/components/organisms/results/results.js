import React from 'react'

import { Grid } from 'semantic-ui-react'
import { BreakEvenProfileCard, BreakEvenResultsCard } from '../../molecules'
import { formatNumber } from '../../../helpers'
import './results.less'

const Results = (props) => {
  const { variableCostPerUnit, numUnits, pricePerUnit, totalFixedCost } = props

  const breakEvenPointUnits = totalFixedCost / (pricePerUnit - variableCostPerUnit)
  const breakEvenPointRevenue = breakEvenPointUnits * (pricePerUnit - variableCostPerUnit)

  return (
    <div className='resultsContainer'>
      <div className='gradientBackground'></div>
      <div className='dataCards-container'>
        <Grid>
          <Grid.Row columns={2} stackable stretched>
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
            {/* Graph goes here */}
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