import React from 'react'

import { Container } from 'semantic-ui-react'
import './BreakEvenProfileCard.less'

const BreakEvenProfileCard = (props) => {
  return(
    <Container className='breakEvenProfile-container'>
      <h3>Break-Even Profile</h3>
      <p>High-level estimate for units and sales dollars</p>
      <div className='circles-container'>
        <div className='unitsCircle'>
          <div className='circleContent'>
            <div>1,000</div>
            <div>Units</div>
          </div>
        </div>
        <div className='salesCircle'>
          <div className='circleContent'>
            <div>$10,000</div>
            <div>Sales</div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default BreakEvenProfileCard