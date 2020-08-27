import React, { useState } from 'react'

import { Card, Grid} from 'semantic-ui-react'
import './breakEvenProfileCard.less'
import { EditableTotal } from '../../atoms'

const BreakEvenProfileCard = (props) => {
  const [showModal, setShowModal] = useState(false)
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
              onEdit={(val) => {
                props.updateNumUnits(val)
                setShowModal(true)
              }}
            />
            <EditableTotal
              title='Selling price per unit'
              value={props.pricePerUnit}
              onEdit={(val) => {
                props.updatePricePerUnit(val)
                setShowModal(true)
              }}
            />
            <EditableTotal
              title='Total fixed cost'
              value={props.totalFixedCost}
              onEdit={(val) => {
                props.updateFixedCost(val)
                setShowModal(true)
              }}
            />
            <EditableTotal
              title='Total variable cost'
              value={props.variableCostPerUnit}
              onEdit={(val) => {
                props.updateVariableCost(val)
                setShowModal(true)
              }}
            />
          </Grid>
        </div>
      </Card.Content>
    </Card>
  )
}

export default BreakEvenProfileCard