import React from 'react'
import { Form, Radio, Grid } from 'semantic-ui-react'
import { NumbersInputForm } from '../../molecules'
import { MoneyInput } from '../../atoms'

import { variableCostFields, variableCostInitState } from './variableCostsFieldsData'

import './variableCosts.less'
import { CALCULATOR_STEPS } from '../../../constants/constants.js'
import { sumValues } from '../../../helpers'

class VariableCosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      knowVariableCosts: null,
      totalVariableCosts: 0,
      fields: {
        'Direct Materials': 0,
        'Piece Rate Labor': 0,
        'Production Supplies': 0,
        Commissions: 0,
        'Freight Out': 0,
        'Other Variable Costs': 0,
      }
    }
  }

  resetTotalVariableCosts = () => {
    this.setState({ totalVariableCosts: 0 })
  }

  resetFields = () => {
    this.setState({ fields: variableCostInitState })
    this.resetTotalVariableCosts()
  }

  handleRadioButtonChange = (e, { value }) => {
    value === 'yes' && this.resetFields()
    value === 'no' && this.resetTotalVariableCosts()
    this.setState({ knowVariableCosts: value})
  }

  handleInputFieldChange = (e, { name, value }) => {
    this.setState({
      fields: {...this.state.fields, [name]: value}
    }, () => {
      const runningSum = sumValues(this.state.fields)
      this.setState({totalVariableCosts: runningSum})
    })
  }

  handleSubmit = () => {
    this.props.setVariableCost(this.state.totalVariableCosts)
    this.props.goToStep(CALCULATOR_STEPS.VARIABLE_COSTS + 1)
  }

  totalMonthlyVariableCosts = (
    <Grid.Column>
      <label htmlFor='totalVariableCosts'>Total monthly variable costs</label>
      <p>Enter the sum of all known variable costs</p>
      <Form.Field>
        <MoneyInput name='totalVariableCosts' onChange={(e, {value}) => {
          this.setState({totalVariableCosts: value})
          }}/>
      </Form.Field>
    </Grid.Column>
  )

  render() {
    return (
      <div className={`variableCosts-container ${this.props.visible ? '' : 'hidden'}`}>
        <h3>Calculate your total variable costs per unit</h3>
        <p>Variable costs are costs that change with sales or volume. They are based on the production of one unit.</p>
        <h4>Do you know your variable cost per unit?</h4>
        <Form onSubmit={this.handleSubmit}>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <Form.Field
                control={Radio}
                label='Yes'
                name='yesBox'
                value='yes'
                checked={this.state.knowVariableCosts === 'yes'}
                onChange={this.handleRadioButtonChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Radio}
                label='No'
                name='noBox'
                value='no'
                checked={this.state.knowVariableCosts === 'no'}
                onChange={this.handleRadioButtonChange}
              />
            </Grid.Column>
            {this.state.knowVariableCosts === 'no' && <NumbersInputForm  onChange={this.handleInputFieldChange} fields={variableCostFields} />}
            {this.state.knowVariableCosts === 'yes' && this.totalMonthlyVariableCosts}
          </Grid>
          <Grid columns={1}>
            {this.state.knowVariableCosts === 'yes' && 
              <Grid.Column>
                <div className='variableCost-suggestion'>Unsure about your total variable costs? 
                  <a onClick={() => this.setState({ knowVariableCosts: 'no'})}>Add all variable costs individually</a>
                </div>
              </Grid.Column>}
            {this.state.knowVariableCosts && 
              <Grid.Column>
                <Form.Button primary content='Continue' />
              </Grid.Column>}          
          </Grid>
        </Form>
      </div>
    )
  }
}

export default VariableCosts