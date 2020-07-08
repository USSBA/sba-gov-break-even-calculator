import React from 'react'

import { Grid } from 'semantic-ui-react'
import { BreakEvenProfileCard, BreakEvenWelcomeCard } from '../../molecules'
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
        <Grid>
          <Grid.Row columns={2} stackable stretched>
            <Grid.Column>
              <BreakEvenWelcomeCard 
                expectedUnits={100}
                breakEvenUnits={150}
                pricePerUnit={10}
                variableCost={4}
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