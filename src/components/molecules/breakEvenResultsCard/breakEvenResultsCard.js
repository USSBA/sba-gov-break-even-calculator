import React from 'react'

import { Container, Grid, Image } from 'semantic-ui-react'

import calculatorIcon from '../../../images/calculator_icon.svg'
import { formatNumber, roundToTwoDecimals } from '../../../helpers'
import './breakEvenResultsCard.less'

const BreakEvenResultsCard = (props) => {
  const { expectedUnits, breakEvenUnits, breakEvenRevenue, pricePerUnit, variableCost, fixedCost } = props;

  const netUnitProfit = pricePerUnit - variableCost

  const profitOrLoss = () => {
    const profitOrLossNum = (expectedUnits * netUnitProfit) - fixedCost;
    if(profitOrLossNum < 0) {
      return `-$${formatNumber(Math.abs(profitOrLossNum))}`
    }
    return `$${formatNumber(profitOrLossNum)}`
  }

  const willBreakEven = expectedUnits >= breakEvenUnits;
  return(
    <Container className='breakEvenWelcome-container'>
      <Grid>
        <Grid.Row columns={2} stretched>
          <Grid.Column width={4}>
            <Image src={calculatorIcon} alt='calculator icon' size='tiny' centered/>
          </Grid.Column>
          <Grid.Column width={12}>
            <h4>Your Break-Even Point Results</h4>
            <p>Estimated calculation based on your inputs</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} stretched>
          <Grid.Column>
            <div className='units'>
              <div className='heading'>
                Units
                <div className='number'>{breakEvenUnits}</div>
                <p>needed to sell in order to cover your costs</p>
              </div>
              <p>If you sell your anticipated</p>
              <div className='number'>{`${expectedUnits} units`}</div>
              <p>{`your ${willBreakEven ? 'profit' : 'loss'} will be`}</p>
              <div className={`number ${willBreakEven ? 'profit' : 'loss'}`}>
                {profitOrLoss()}
              </div>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className='sales'>
              <div className='heading'>
                Sales
                <div className='number'>${formatNumber(breakEvenRevenue)}</div>
                <p>revenue dollars needed to break even</p>
              </div>
              <p>Contribution margin ratio</p>
              <div className='number'>
                {roundToTwoDecimals(netUnitProfit / pricePerUnit)}%
              </div>
              {!willBreakEven && (
                <>
                  <p>You will need to sell</p>
                  <p><span className='number loss'> {breakEvenUnits - expectedUnits} </span>more to break even</p>
                </>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default BreakEvenResultsCard