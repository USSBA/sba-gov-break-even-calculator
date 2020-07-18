import React from 'react'
import BreakEvenProfileCard from "../src/components/molecules/breakEvenProfileCard/breakEvenProfileCard"
import { Grid } from "semantic-ui-react"
import { withKnobs, number } from "@storybook/addon-knobs"

export default {
  title: 'Break Even Profile Card',
  component: BreakEvenProfileCard,
  decorators: [withKnobs]

};

export const breakEvenProfileCard = () => {
  const units = number("Units", 1500, {min:1});
  const sales = number("Sales", 20000, {min:1})
  return (
    <div className='dataCards-container'>
      <Grid stackable>
        <Grid.Row columns={2} stretched>
          <Grid.Column>
            <BreakEvenProfileCard breakEvenUnits={units} breakEvenSales={sales}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
