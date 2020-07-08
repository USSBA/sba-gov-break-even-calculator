import React from 'react'

import { Container, Grid } from 'semantic-ui-react'

const BreakEvenWelcomeCard = (props) => {
  const {expectedUnits, breakEvenUnits, pricePerUnit, variableCost} = props;

  const willBreakEven = expectedUnits > breakEvenUnits;
  return(
    <Container className='breakEvenProfile-container'>
      <h3>Welcome</h3>
      <h4>Your Break-Even Point Results</h4>
      <p>Estimated calculation based on your inputs</p>
      <Grid columns={2}>
        <Grid.Column>
          <div className='units'>
            <div className='heading'>
              Units
              <div className='number'>100</div>
            </div>
            <p>needed to sell in order to cover your costs</p>
            <p>If you sell your anticipated</p>
            <div className='number'>{`${expectedUnits}`}</div>
            <p>{`your ${willBreakEven ? 'profit' : 'loss'} will be`}</p>
            <div className={`number ${willBreakEven ? 'profit' : 'loss'}`}>
              {expectedUnits - breakEvenUnits * pricePerUnit}
            </div>
          </div>
        </Grid.Column>
        <Grid.Column>
          <div className='sales'>
            <div className='heading'>
              Sales
              <div className='number'>$1,000</div>
            </div>
            <p>revenue dollars needed to break even</p>
            <p>Contribution margin ratio</p>
            <div className='number'>
              {(pricePerUnit - variableCost) / pricePerUnit}
            </div>
            {!willBreakEven && <p>You will need to sell 
              <span className='number loss'>{} </span>
              more to break even
            </p>}
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default BreakEvenWelcomeCard