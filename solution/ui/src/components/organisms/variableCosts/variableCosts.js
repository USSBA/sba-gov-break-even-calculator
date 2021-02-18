import React from 'react'
import PropTypes from 'prop-types'

import { Button, Form, Icon, Radio, Grid } from 'semantic-ui-react'
import { NumbersInputForm } from '../../molecules'
import { MoneyInput } from '../../atoms'

import { variableCostFields, variableCostInitState } from './variableCostsFieldsData'

import './variableCosts.less'
import { CALCULATOR_STEPS } from '../../../constants'
import { sumValues } from '../../../helpers'

class VariableCosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      knowVariableCosts: null,
      totalVariableCosts: '',
      formError: false,
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

  self = CALCULATOR_STEPS.VARIABLE_COSTS

  resetTotalVariableCosts = () => {
    this.setState({ totalVariableCosts: '' })
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

  handleInputFieldChange = (name, value) => {
    this.setState({
      fields: {...this.state.fields, [name]: value}
    }, () => {
      const runningSum = sumValues(this.state.fields)
      this.setState({totalVariableCosts: runningSum})
    })
  }

  handleSubmit = () => {
    const {totalVariableCosts} = this.state

    if (!totalVariableCosts && totalVariableCosts !== 0) {
      this.setState({ formError: true })
    } else {
      this.setState({ formError: false })
      this.props.setVariableCost(this.state.totalVariableCosts)
      this.props.goToStep(CALCULATOR_STEPS.VARIABLE_COSTS + 1)
    }
  }

  
  totalVariableCostPerUnit = () => {
    return(<Grid.Column>
      <label htmlFor='totalVariableCosts'>Total monthly variable costs*</label>
      <p>Enter the sum of all known variable costs</p>
      <Form.Field>
        <MoneyInput name='totalVariableCosts'
          errorMessage= 'Enter a valid variable cost per unit to continue'
          formError= {this.state.formError}
          onChange={(e, {value}) => {
            this.setState({ totalVariableCosts: value })
            this.setState({ formError: false })
          }}/>
      </Form.Field>
    </Grid.Column>)
  }

  render() {
    const showWarning = parseInt(this.state.totalVariableCosts) >= parseInt(this.props.pricePerUnit);
    
    return (
      <div aria-hidden={!this.props.visible} className={`variableCosts-container ${this.props.visible ? '' : 'hidden'}`}>
        <h3>Calculate your total variable costs per unit</h3>
        <p>
          Variable costs are costs that change with sales or volume. They are based on the production of one unit.<br/>
          <span className="subtext">* indicates required field</span>
        </p>
        <Form onSubmit={this.handleSubmit}>
          <div role='group' aria-labelledby='variableCostQuestion'>
            <h4 id='variableCostQuestion'>Do you know your variable cost per unit?*</h4>
            <Grid container columns={2} stackable>
              <Grid.Column>
                <Form.Field
                  control={Radio}
                  label='Yes'
                  aria-label='yes, I know the total of my variable costs per unit'
                  name='yesBox'
                  value='yes'
                  checked={this.state.knowVariableCosts === 'yes'}
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
                  checked={this.state.knowVariableCosts === 'no'}
                  onChange={this.handleRadioButtonChange}
                />
              </Grid.Column>
              {this.state.knowVariableCosts === 'no' && 
                <NumbersInputForm
                  onChange={(e, { name, value }) => {
                    this.handleInputFieldChange(name, value)
                    this.setState({ formError: false })
                  }}
                  fields={variableCostFields} />
              }
              {this.state.knowVariableCosts === 'yes' && this.totalVariableCostPerUnit()}
            </Grid>
          </div>
          <Grid columns={1}>
            {this.state.knowVariableCosts === 'yes' && 
              <Grid.Column>
                <div className='variableCost-suggestion'>Help with your total variable costs? 
                  <Button basic className='noBorder darkBlue' type='button' onClick={() => this.setState({ knowVariableCosts: 'no'})}>Add variable costs individually</Button>
                </div>
              </Grid.Column>}
              { this.state.formError && this.state.knowVariableCosts === 'no' &&
                <p role="alert" className='errorMsg'>Enter a valid variable cost per unit to continue</p>
              }
            {this.state.knowVariableCosts && 
              <Grid.Column>
                <Grid columns={2} reversed='mobile' verticalAlign='middle' stackable>
                  <Grid.Column width={3}>
                    <Form.Button type='submit' className='continueButton' primary content='CONTINUE' />
                  </Grid.Column>
                  {showWarning && 
                  <Grid.Column width={12}>
                    <Grid columns={2} verticalAlign='middle'>
                      <Grid.Column className='warningMessage' width={1}>
                      <Icon size='small' circular name='minus'/>
                    </Grid.Column>
                    <Grid.Column role="alert" floated='left' className='warningMessage' width={12}>
                      <p>Your variable costs are higher than your unit price. You will never break-even. Consider adjusting your values.</p>
                    </Grid.Column>
                    </Grid>
                  </Grid.Column>}
                </Grid>
              </Grid.Column>}           
          </Grid>
        </Form>
        <Grid className='returnLinks' columns={2} >
          <Grid.Column id='backLink' mobile={8} computer={4}>
            <Button 
              basic
              color='blue'
              type='button'
              aria-label='Back to unit sales'
              className='noBorder navLink'
              onClick={() => this.props.goToStep(this.self - 1)}
            >{`< Back to unit sales`}</Button>
          </Grid.Column>
          <Grid.Column id='restartLink' mobile={8} computer={3}>
            <Button basic color='blue' type='button' className='noBorder navLink' onClick={this.props.restart}>Restart Analysis</Button>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

VariableCosts.propTypes = {
  goToStep: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  setVariableCost: PropTypes.func.isRequired,
  value: PropTypes.number,
  pricePerUnit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  visible: PropTypes.bool.isRequired
}

export default VariableCosts