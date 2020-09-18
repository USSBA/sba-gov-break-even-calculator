import React from 'react'

import { Grid, Image, Card } from 'semantic-ui-react'

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
    <Card fluid>
      <Card.Content className='breakEvenWelcome-container'>
        <Grid>
          <Grid.Row columns={2} stretched>
            <Grid.Column width={4}>
              <Image src={calculatorIcon} alt='calculator icon' size='tiny' centered/>
            </Grid.Column>
            <Grid.Column width={12}>
              <h3>Your Break-Even Point Results</h3>
              <p>Estimated calculation based on your inputs</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} stretched>
            <Grid.Column>
              <Card className='units'>
                <Card.Content>
                  <Card.Header>
                    Units
                    <div className='number'>{formatNumber(breakEvenUnits)}</div>
                    <p>needed to sell in order to cover your costs</p>
                  </Card.Header>
                  <Card.Description extra>
                    <p>If you sell your anticipated</p>
                    <div className='number'>{`${formatNumber(expectedUnits)} units`}</div>
                    <p>{`your ${willBreakEven ? 'profit' : 'loss'} will be`}</p>
                    <div className={`number ${willBreakEven ? 'profit' : 'loss'}`}>
                      {profitOrLoss()}
                    </div>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card className='sales'>
                <Card.Content>
                  <Card.Header>
                    Sales
                    <div className='number'>${formatNumber(breakEvenRevenue)}</div>
                    <p>revenue dollars needed to break even</p>
                  </Card.Header>
                  <Card.Description>
                    <p>Contribution margin ratio</p>
                    <div className='number contributionMargin'>
                      {roundToTwoDecimals(netUnitProfit / pricePerUnit)*100}%
                    </div>
                    {!willBreakEven && (
                      <>
                        <p>You will need to sell</p>
                        <p><span className='number loss'> {formatNumber(breakEvenUnits - expectedUnits)} </span>more to break even</p>
                      </>
                    )}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default BreakEvenResultsCard