import React from 'react'
import { Grid, Container, Form } from 'semantic-ui-react'
import Layout from '../components/layout'
import { EditableTotal } from '../components/atoms'
import { Hero } from '../components/molecules/'
import { FixedCosts, UnitSales, PricePerUnit, Results, VariableCosts } from '../components/organisms/'
import { CALCULATOR_STEPS } from '../constants/constants.js'
import '../styles/typography.less'

class BreakEvenCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepNum: 0,
      variableCostPerUnit: '',
      numUnits: '',
      pricePerUnit: '',
      totalFixedCost: '',
      shouldReset: false,
    }
  }

  goToStep = (stepNum) => {
    this.setState({stepNum});
  }

  updateVariableCost = (variableCost) => {
    this.setState({variableCostPerUnit: variableCost});
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

  restartAnalysis = () => {
    this.setState({shouldReset: true}, () => {
      this.setState({
        stepNum: 0,
        variableCostPerUnit: '',
        numUnits: '',
        pricePerUnit: '',
        totalFixedCost: '',
        shouldReset: false,
      })
    })
    this.goToStep(CALCULATOR_STEPS.FIXED_COSTS)
  }

  render() {
    if (this.state.stepNum === CALCULATOR_STEPS.RESULTS_PAGE) {
      return(
        <Layout>
          <Results 
            variableCostPerUnit={this.state.variableCostPerUnit || 0}
            numUnits={this.state.numUnits || 0}
            pricePerUnit={this.state.pricePerUnit || 0}
            totalFixedCost={this.state.totalFixedCost || 0}
          />
        </Layout>
      )
    }
    return (
      <Layout>
        <Grid columns={1}>
          <Grid.Column>
            <Hero>
              <FixedCosts
                visible={this.state.stepNum === CALCULATOR_STEPS.FIXED_COSTS}
                goToStep={this.goToStep}
                setFixedCost={this.updateFixedCost}
                key={this.state.shouldReset} // change in key forces a re-mount
                />
              <UnitSales 
                visible={this.state.stepNum === CALCULATOR_STEPS.UNIT_SALES}
                goToStep={this.goToStep}
                setNumUnits={this.updateNumUnits}
                value={this.state.numUnits}
                restart={this.restartAnalysis}
                />
              <PricePerUnit 
                visible={this.state.stepNum === CALCULATOR_STEPS.PRICE_PER_UNIT}
                goToStep={this.goToStep}
                setUnitPrice={this.updatePricePerUnit}
                value={this.state.pricePerUnit}
                restart={this.restartAnalysis}
                />
              <VariableCosts
                visible={this.state.stepNum === CALCULATOR_STEPS.VARIABLE_COSTS}
                goToStep={this.goToStep}
                setVariableCost={this.updateVariableCost}
                key={this.state.shouldReset} // change in key forces a re-mount
                />
            </Hero>
          </Grid.Column>
        </Grid>
        <Container className='runningTotals-container'>
          <Grid>
              {this.state.stepNum > CALCULATOR_STEPS.UNIT_SALES &&
              <EditableTotal
                title='Number of units'
                type='units'
                value={this.state.numUnits || 1000}
                onEdit={this.updateNumUnits}
              />}
              {this.state.stepNum > CALCULATOR_STEPS.PRICE_PER_UNIT &&
              <EditableTotal
                title='Selling price per unit'
                value={this.state.pricePerUnit || 1000}
                onEdit={this.updatePricePerUnit}
              />}
              {this.state.stepNum > CALCULATOR_STEPS.FIXED_COSTS && 
              <EditableTotal
                title='Total fixed cost'
                value={this.state.totalFixedCost}
                onEdit={this.updateFixedCost}
              />}
          </Grid>
        </Container>
      </Layout>
    )
  }
}

export default BreakEvenCalculator;
