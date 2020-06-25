import React from 'react'
import Layout from '../components/layout'
import Hero from '../components/molecules/hero/hero'
import StepOne from '../components/organisms/stepOne/stepOne'
import { Grid } from 'semantic-ui-react'
import '../styles/typography.less'

class BreakEvenCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepNum: 1,
      totalVariableCost: 0,
      numUnits: 0,
      pricePerUnit: 0,
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

  updateFixedCost = (fixedCost) => {
    this.setState({totalFixedCost: fixedCost});
  }

  render() {
    return (
      <Layout>
        <Grid columns={1}>
          <Grid.Column>
            <Hero>
              <StepOne 
                goToStep={this.goToStep}
                setFixedCost={this.updateFixedCost}
              />
            </Hero>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default BreakEvenCalculator;
