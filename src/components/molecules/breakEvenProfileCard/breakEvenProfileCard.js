import React from 'react'

import { Label, Card, Icon} from 'semantic-ui-react'
import './breakEvenProfileCard.less'
import { formatNumber } from '../../../helpers'


const BreakEvenProfileCard = (props) => {
  return(
    <Card fluid>
      <Card.Content className='breakEvenProfile-container'>
        <h3>Break-Even Profile</h3>
        <p>High-level estimate for units and sales dollars</p>
        <div className='circles-container'>
          <div className='unitsCircle'>
            <div className='circleContent'>
              <div className='number'>{formatNumber(props.breakEvenUnits)}</div>
              <div>Units</div>
            </div>
          </div>
          <div className='salesCircle'>
            <div className='circleContent'>
              <div className='number'>${formatNumber(props.breakEvenSales)}</div>
              <div>Sales</div>
            </div>
          </div>
        </div>
        <Label basic>
          <Icon className='legend-color units' name='square' />
          Units Sold
        </Label>
        <Label basic>
          <Icon className='legend-color sales' name='square' />
          Sales Dollars
        </Label>
      </Card.Content>
    </Card>
  )
}

export default BreakEvenProfileCard