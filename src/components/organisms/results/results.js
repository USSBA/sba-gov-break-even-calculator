import React from 'react'

import { Grid } from 'semantic-ui-react'
import { BreakEvenProfileCard } from '../../molecules'
import './results.less'

const Results = (props) => {
  const { variableCostPerUnit, numUnits, pricePerUnit, totalFixedCost } = props
  const breakEvenPointUnits = totalFixedCost / (pricePerUnit - variableCostPerUnit)
  const breakEvenPointRevenue = breakEvenPointUnits * pricePerUnit;

  return (
    <div className='resultsContainer'>
      <div className='gradientBackground'></div>
      <div className='dataCards-container'>
        <Grid columns={2} stackable>
          <Grid.Column>
            {/* this is holding space for welcome card*/}
            <BreakEvenProfileCard /> 
          </Grid.Column>
          <Grid.Column>
            <BreakEvenProfileCard 
              breakEvenUnits={breakEvenPointUnits}
              breakEvenSales={breakEvenPointRevenue}
            />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  )
}

export default Results