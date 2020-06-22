import React from 'react'
import { Form, Radio, Grid } from 'semantic-ui-react'
import { NumbersInputForm } from '../../molecules'

class StepOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      knowFixedCosts: null,
    }
  }

  fieldNames = [
    {name: 'Amortization'},
    {name: 'Rent'},
    {name: 'Insurance'},
    {name: 'Salaries'},
    {name: 'Utilities'},
    {name: 'Deprecation'},
    {name: 'Interest Expense'},
    {name: 'Property Taxes'},
    {name: 'Other Monthly Costs'},
    {name: 'Other Fixed Costs'},
  ]

  handleChange = (e, { value }) => {
    this.setState({ knowFixedCosts: value})
  }

  render() {
    return (
      <div className='stepOne-card_container'>
        <h3>Calculate your total fixed costs</h3>
        <p>Fixed costs are costs that do not change with sales or volume. They are based on time,  for this calculator the time period based around a monthly schedule.</p>
        <h4>Do you know the total of your monthly fixed costs?</h4>
        <Form>
          <Grid container columns={2} stackable>
              <Grid.Column>
                <Form.Field
                  control={Radio}
                  label='Yes'
                  name='yesBox'
                  value='yes'
                  checked={this.state.knowFixedCosts === 'yes'}
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Radio}
                  label='No'
                  name='noBox'
                  value='no'
                  checked={this.state.knowFixedCosts === 'no'}
                  onChange={this.handleChange}
                />
              </Grid.Column>
          </Grid>
          <NumbersInputForm fields={this.fieldNames} />
        </Form>
      </div>
    )
  }
}

export default StepOne