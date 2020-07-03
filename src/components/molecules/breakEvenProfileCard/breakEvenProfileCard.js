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
            <div className='number'>{props.breakEvenUnits}</div>
            <div>Units</div>
          </div>
        </div>
        <div className='salesCircle'>
          <div className='circleContent'>
            <div className='number'>${props.breakEvenSales}</div>
            <div>Sales</div>
          </div>
        </div>
      </div>
      <div className='circles-legend units'>
        <span className='legend-color units'></span>
        <span className='text'>Units sold</span>
      </div>
      <div className='circles-legend sales'>
        <span className='legend-color sales'></span>
        <span className='text'>Sales dollars</span>
      </div>
    </Container>
  )
}

export default BreakEvenProfileCard