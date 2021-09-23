import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import Layout from '../components/layout'
import { EditableTotal } from '../components/atoms'
import { BecAccordion, Hero } from '../components/molecules/'
import { FixedCosts, UnitSales, PricePerUnit, Results, VariableCosts } from '../components/organisms/'
import { CALCULATOR_STEPS, FAQ_CONTENT } from '../constants'
import '../styles/typography.less'
import './index.less'

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
            updateFixedCost={this.updateFixedCost}
            updateNumUnits={this.updateNumUnits}
            updatePricePerUnit={this.updatePricePerUnit}
            updateVariableCost={this.updateVariableCost}
          />
        </Layout>
      )
    }
    return (
      <Layout>
        <Grid columns={1}>
          <Grid.Column>
            <Hero>
              <>
                <FixedCosts
                  visible={this.state.stepNum === CALCULATOR_STEPS.FIXED_COSTS}
                  goToStep={this.goToStep}
                  setFixedCost={this.updateFixedCost}
                  totalFixedCosts={this.state.totalFixedCost}
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
                  pricePerUnit={this.state.pricePerUnit}
                  goToStep={this.goToStep}
                  setVariableCost={this.updateVariableCost}
                  restart={this.restartAnalysis}
                  key={this.state.shouldReset + 1} // change in key forces a re-mount
                  />
              </>
            </Hero>
          </Grid.Column>
        </Grid>
        <Container className='runningTotals-container'>
          <Grid>
              {this.state.stepNum > CALCULATOR_STEPS.UNIT_SALES &&
              <EditableTotal
                key="number of units"
                title='Number of units'
                type='units'
                value={this.state.numUnits}
                onEdit={this.updateNumUnits}
              />}
              {this.state.stepNum > CALCULATOR_STEPS.PRICE_PER_UNIT &&
              <EditableTotal
                key="price per unit"
                title='Selling price per unit'
                value={this.state.pricePerUnit}
                onEdit={this.updatePricePerUnit}
              />}
              {this.state.stepNum > CALCULATOR_STEPS.FIXED_COSTS && 
              <EditableTotal
                key="total fixed cost"
                title='Total fixed cost'
                value={this.state.totalFixedCost}
                onEdit={this.updateFixedCost}
              />}
          </Grid>
        </Container>
        <Container>
            <BecAccordion data={FAQ_CONTENT[this.state.stepNum] || []}/>
        </Container>
        
        <feedback-form product="BEPC" productTitle="COVID Break Even Point Calculator Feedback"></feedback-form>,
      </Layout>
      
    )
  }
}

export default BreakEvenCalculator;
