import React from 'react'
import { withKnobs, number } from "@storybook/addon-knobs"
import BreakEvenGraph from "../src/components/molecules/breakEvenGraph/breakEvenGraph"
import { Grid } from "semantic-ui-react"

export default {
  title: 'Break Even Graph',
  component: breakEvenGraph,
  decorators: [withKnobs]

};

export const breakEvenGraph = () => {
  const units = number("Units", 1500, {min:1});
  const sales = number("Sales", 20000, {min:1})

  return (
    <div className='dataCards-container'>
      <Grid stackable>
        <Grid.Row columns={2} stretched>
          <Grid.Column>
            <BreakEvenGraph
              breakEvenUnits={units}
              breakEvenSales={sales}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )

}
