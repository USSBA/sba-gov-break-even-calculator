import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Card, Grid } from 'semantic-ui-react'
import { Modal } from '../../atoms'
import './breakEvenProfileCard.less'
import { EditableTotal } from '../../atoms'

const BreakEvenProfileCard = (props) => {
  const [showModal, setShowModal] = useState(false)
  const closeWithDelay = () => {
    setTimeout(() => {setShowModal(false)}, 4000)
  }
  return(
    <Card fluid>
      <Modal 
        open={showModal}
        onClose={() => setShowModal(false)}
        content='You have successfully updated your values'
      />
      <Card.Content className='breakEvenProfile-container'>
        <h3>Break-Even Profile</h3>
        <div className='runningTotals-container'>
          <Grid>
            <EditableTotal
              title='# of units'
              type='units'
              value={props.numUnits}
              onEdit={(val) => {
                props.updateNumUnits(val)
                setShowModal(true)
                closeWithDelay()
              }}
            />
            <EditableTotal
              title='Price Per Unit'
              value={props.pricePerUnit}
              onEdit={(val) => {
                props.updatePricePerUnit(val)
                setShowModal(true)
                closeWithDelay()
              }}
            />
            <EditableTotal
              title='Fixed Costs'
              value={props.totalFixedCost}
              onEdit={(val) => {
                props.updateFixedCost(val)
                setShowModal(true)
                closeWithDelay()
              }}
            />
            <EditableTotal
              title='Variable Costs'
              value={props.variableCostPerUnit}
              onEdit={(val) => {
                props.updateVariableCost(val)
                setShowModal(true)
                closeWithDelay()
              }}
            />
          </Grid>
        </div>
      </Card.Content>
    </Card>
  )
}

BreakEvenProfileCard.propTypes = {
  updateNumUnits: PropTypes.func.isRequired,
  updateFixedCost: PropTypes.func.isRequired,
  updatePricePerUnit: PropTypes.func.isRequired,
  updateVariableCost: PropTypes.func.isRequired,
  numUnits: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  pricePerUnit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  totalFixedCost: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  variableCostPerUnit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default BreakEvenProfileCard