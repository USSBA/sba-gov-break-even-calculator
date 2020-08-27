import React from 'react'

import { Card, Grid} from 'semantic-ui-react'
import './breakEvenProfileCard.less'
import { EditableTotal } from '../../atoms'

const BreakEvenProfileCard = (props) => {
  return(
    <Card fluid>
      <Card.Content className='breakEvenProfile-container'>
        <h3>Break-Even Profile</h3>
        <div className='runningTotals-container'>
          <Grid>
            <EditableTotal
              title='Number of units'
              type='units'
              value={props.numUnits}
              onEdit={props.updateNumUnits}
            />
            <EditableTotal
              title='Selling price per unit'
              value={props.pricePerUnit}
              onEdit={props.updatePricePerUnit}
            />
            <EditableTotal
              title='Total fixed cost'
              value={props.totalFixedCost}
              onEdit={props.updateFixedCost}
            />
            <EditableTotal
              title='Total variable cost'
              value={props.variableCostPerUnit}
              onEdit={props.updateVariableCost}
            />
          </Grid>
        </div>
      </Card.Content>
    </Card>
  )
}

export default BreakEvenProfileCard