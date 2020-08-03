import React from 'react'
import { Form, Radio, Grid } from 'semantic-ui-react'
import { NumbersInputForm } from '../../molecules'
import { MoneyInput } from '../../atoms'

import { fixedCostFields, fixedCostInitState } from './fixedCostsFieldsData'

import './fixedCosts.less'
import { CALCULATOR_STEPS } from '../../../constants/constants.js'
import { sumValues } from '../../../helpers'

class FixedCosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      knowFixedCosts: null,
      totalFixedCosts: 0,
      formError: false,
      fields: {
        Amortization: 0,
        Rent: 0,
        Insurance: 0,
        Salaries: 0,
        Utilities: 0,
        Deprecation: 0,
        'Interest Expense': 0,
        'Property Taxes': 0,
        'Other Monthly Costs': 0,
        'Other Fixed Costs': 0,
      }
    }
  }

  resetTotalFixedCosts = () => {
    this.setState({ totalFixedCosts: 0 })
  }

  resetFields = () => {
    this.setState({ fields: fixedCostInitState })
    this.resetTotalFixedCosts()
  }

  handleRadioButtonChange = (e, { value }) => {
    value === 'yes' && this.resetFields()
    value === 'no' && this.resetTotalFixedCosts()
    this.setState({ knowFixedCosts: value})
  }

  handleInputFieldChange = (name, value ) => {
    this.setState({
      fields: {...this.state.fields, [name]: value}
    }, () => {
      const runningSum = sumValues(this.state.fields)
      this.setState({totalFixedCosts: runningSum})
    })
  }

  handleSubmit = () => {
    if (this.state.totalFixedCosts > 0) {
      this.setState({ formError: false})
      this.props.setFixedCost(this.state.totalFixedCosts)
      this.props.goToStep(CALCULATOR_STEPS.FIXED_COSTS + 1)
    } else {
      this.setState({ formError: true})
    }
  }

  render() {
    return (
      <div className={`fixedCosts-container ${this.props.visible ? '' : 'hidden'}`}>
        <h3>Calculate your total fixed costs</h3>
        <p>
          Fixed costs are costs that do not change with sales or volume because they are based on time.
          For this calculator the time period is calculated monthly. <br/>
          <span className="subtext">* indicates required field</span>
        </p>
        <h4>Do you know the total of your monthly fixed costs?*</h4>
        <Form onSubmit={this.handleSubmit}>
          <Grid container columns={2} stackable>
            <Grid.Column>
              <Form.Field
                control={Radio}
                label='Yes'
                name='yesBox'
                value='yes'
                checked={this.state.knowFixedCosts === 'yes'}
                onChange={this.handleRadioButtonChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Radio}
                label='No'
                name='noBox'
                value='no'
                checked={this.state.knowFixedCosts === 'no'}
                onChange={this.handleRadioButtonChange}
              />
            </Grid.Column>
            {this.state.knowFixedCosts === 'no' && 
              <NumbersInputForm
                onChange={(e, { name, value }) => {
                  this.handleInputFieldChange(name, value)
                  this.setState({ formError: false })
                }}
                fields={fixedCostFields} />
            }
            {this.state.knowFixedCosts === 'yes' &&
              <Grid.Column>
                <label htmlFor='totalFixedCosts'>Do you know the total of your monthly fixed costs?*</label>
                <div className="subtext">Enter the sum of all known fixed costs:</div>
                <Form.Field>
                  <MoneyInput 
                    value={this.props.totalFixedCosts} 
                    name='totalFixedCosts'
                    autoFocus
                    errorMessage= 'Enter a valid fixed cost to continue'
                    formError= {this.state.formError}
                    onChange={(e, { value }) => {
                      this.props.setFixedCost(value)
                      this.setState({ totalFixedCosts: value })
                      this.setState({ formError: false })
                    }}/>
                </Form.Field>
              </Grid.Column>}
          </Grid>
          <Grid columns={1}>
            {this.state.knowFixedCosts === 'yes' && 
              <Grid.Column>
                <div className='fixedCost-suggestion'>Unsure about your total fixed costs? 
                  <a onClick={() => this.setState({ knowFixedCosts: 'no'})}>Add all fixed costs individually</a>
                </div>
              </Grid.Column>}
            {this.state.knowFixedCosts && 
              <Grid.Column>
                {this.state.formError && 
                <p className='errorMsg'>Enter a valid fixed cost to continue</p>
                }
                <Form.Button primary content='CONTINUE' />
              </Grid.Column>}          
          </Grid>
        </Form>
      </div>
    )
  }
}

export default FixedCosts
