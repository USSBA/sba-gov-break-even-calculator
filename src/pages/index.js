import React from 'react'
import { Grid } from 'semantic-ui-react'
import Layout from '../components/layout'
import { Hero } from '../components/molecules/'
import { FixedCosts, UnitSales, PricePerUnit } from '../components/organisms/'
import { CALCULATOR_STEPS } from '../constants/constants.js'
import '../styles/typography.less'

class BreakEvenCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepNum: 1,
      totalVariableCost: 0,
      numUnits: null,
      pricePerUnit: null,
      totalFixedCost: 0,
    }
  }

  goToStep = (stepNum) => {
    this.setState({stepNum});
  }

  updateVariableCost = (variableCost) => {
    this.setState({totalVariableCost: variableCost});
  }

  updateNumUnits = (numUnits) => {
    this.setState({numUnits});
  }

  updatePricePerUnit = (price) => {
    this.setState({pricePerUnit: price})
  }

  updateFixedCost = (fixedCost) => {
    this.setState({totalFixedCost: fixedCost});
  }

  render() {
    return (
      <Layout>
        <Grid columns={1}>
          <Grid.Column>
            <Hero>
              <FixedCosts
                visible={this.state.stepNum === CALCULATOR_STEPS.FIXED_COSTS}
                goToStep={this.goToStep}
                setFixedCost={this.updateFixedCost}
                />
              <UnitSales 
                visible={this.state.stepNum === CALCULATOR_STEPS.UNIT_SALES}
                goToStep={this.goToStep}
                setNumUnits={this.updateNumUnits}
                value={this.state.numUnits}
                />
              <PricePerUnit 
                visible={this.state.stepNum === CALCULATOR_STEPS.PRICE_PER_UNIT}
                goToStep={this.goToStep}
                setUnitPrice={this.updatePricePerUnit}
                value={this.state.pricePerUnit}
                />
            </Hero>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default BreakEvenCalculator;
