import React from 'react'
import PropTypes from 'prop-types'

import { Button, Form, Radio, Grid } from 'semantic-ui-react'
import { NumbersInputForm } from '../../molecules'
import { MoneyInput } from '../../atoms'

import { fixedCostFields, fixedCostInitState } from './fixedCostsFieldsData'

import './fixedCosts.less'
import { CALCULATOR_STEPS } from '../../../constants'
import { sumValues } from '../../../helpers'

class FixedCosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      knowFixedCosts: null,
      totalFixedCosts: this.props.totalFixedCosts || '',
      formError: false,
      fields: {
        Amortization: '',
        Rent: '',
        Insurance: '',
        Salaries: '',
        Utilities: '',
        Depreciation: '',
        'Interest Expense': '',
        'Property Taxes': '',
        'Other Monthly Costs': '',
        'Other Fixed Costs': '',
      }
    }
  }

  resetTotalFixedCosts = () => {
    this.setState({ totalFixedCosts: '' })
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

  handleInputFieldChange = (name, value) => {
    this.setState({
      fields: {...this.state.fields, [name]: value}
    }, () => {
      const runningSum = sumValues(this.state.fields)
      this.setState({totalFixedCosts: runningSum})
    })
  }

  handleSubmit = () => {
    if (!this.state.totalFixedCosts && this.state.totalFixedCosts !== 0) {
      this.setState({ formError: true })
    } else {
      this.setState({ formError: false })
      this.props.setFixedCost(this.state.totalFixedCosts)
      this.props.goToStep(CALCULATOR_STEPS.FIXED_COSTS + 1)
    }
  }

  render() {
    return (
      <div aria-hidden={!this.props.visible} className={`fixedCosts-container ${this.props.visible ? '' : 'hidden'}`}>
        <h3>Calculate your total fixed costs</h3>
        <p>
          Fixed costs are costs that do not change with sales or volume because they are based on time.
          For this calculator the time period is calculated monthly. <br/>
          <span className="subtext">* indicates required field</span>
        </p>
        <Form data-testid='fixedCosts-form' onSubmit={this.handleSubmit}>
          <div role='group' aria-labelledby='fixedCostQuestion'>
            <h4 id='fixedCostQuestion'>Do you know the total of your monthly fixed costs?*</h4>
            <Grid container columns={2} stackable>
              <Grid.Column>
                <Form.Field
                  control={Radio}
                  label='Yes'
                  aria-label='yes, I know the total of my monthly fixed costs'
                  name='yesBox'
                  value='yes'
                  checked={this.state.knowFixedCosts === 'yes'}
                  onChange={this.handleRadioButtonChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Radio}
                  label='No, input values individually'
                  aria-label='no, input values individually'
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
                  <label htmlFor='totalFixedCosts'>Total monthly fixed costs*</label>
                  <div className="subtext">Enter the sum of all known fixed costs:</div>
                  <Form.Field>
                    <MoneyInput
                      value={this.state.totalFixedCosts} 
                      ariaLabel='total fixed cost'
                      name='totalFixedCosts'
                      autoFocus
                      errorMessage= 'Enter a valid fixed cost to continue'
                      formError= {this.state.formError}
                      onChange={(e, { value }) => {
                        this.setState({ totalFixedCosts: value })
                        this.setState({ formError: false })
                      }}/>
                  </Form.Field>
                </Grid.Column>}
            </Grid>
          </div>
          <Grid columns={1}>
            {this.state.knowFixedCosts === 'yes' && 
              <Grid.Column>
                <div className='fixedCost-suggestion'>
                  Help with your total fixed costs? <Button basic className='noBorder darkBlue' type='button' onClick={() => this.setState({ knowFixedCosts: 'no'})}>Add all fixed costs individually</Button>
                </div>
              </Grid.Column>
            }
            {this.state.formError && this.state.knowFixedCosts === 'no' &&
              <p role="alert" className='errorMsg'>Enter a valid fixed cost to continue</p>
            }
            {this.state.knowFixedCosts && 
              <Grid.Column>
                <Form.Button type='submit' primary content='CONTINUE' />
              </Grid.Column>}          
          </Grid>
        </Form>
      </div>
    )
  }
}

FixedCosts.propTypes = {
  goToStep: PropTypes.func.isRequired,
  setFixedCost: PropTypes.func.isRequired,
  totalFixedCosts: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  visible: PropTypes.bool.isRequired
}

export default FixedCosts
