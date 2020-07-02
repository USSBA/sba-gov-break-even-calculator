import React from 'react'

import { Grid } from 'semantic-ui-react'
import { BreakEvenProfileCard } from '../../molecules'
import './results.less'

const Results = (props) => {
  return (
    <div className='resultsContainer'>
      <div className='gradientBackground'></div>
      <div className='dataCards-container'>
        <Grid columns={2} stackable>
          <Grid.Column>
            <BreakEvenProfileCard />
          </Grid.Column>
          <Grid.Column>
            <BreakEvenProfileCard />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  )
}

export default Results