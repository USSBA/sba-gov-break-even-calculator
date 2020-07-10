import React from 'react'

import { Grid } from 'semantic-ui-react'
import { BreakEvenProfileCard, BreakEvenGraph } from '../../molecules'
import './results.less'

const Results = (props) => {
  const { variableCostPerUnit, numUnits, pricePerUnit, totalFixedCost } = props
  // https://blog.abelotech.com/posts/number-currency-formatting-javascript/
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  const breakEvenPointUnits = formatNumber(totalFixedCost / (pricePerUnit - variableCostPerUnit))
  const breakEvenPointRevenue = formatNumber(breakEvenPointUnits * pricePerUnit)
   
  return (
    <div className='resultsContainer'>
      <div className='gradientBackground'></div>
      <div className='dataCards-container'>
        <Grid columns={2} stackable>
          <Grid.Column>
            {/* welcome card goes here */}
          </Grid.Column>
          <Grid.Column>
            <BreakEvenProfileCard 
              breakEvenUnits={breakEvenPointUnits}
              breakEvenSales={breakEvenPointRevenue}
            />
          </Grid.Column>
        </Grid>
        <Grid columns={1} stackable>
          <Grid.Column>
            <BreakEvenGraph 
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