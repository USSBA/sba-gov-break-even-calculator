import React from 'react'
import { LineChart } from '../../atoms'
import { Card, Icon, Label } from 'semantic-ui-react'
import "./breakEvenGraph.less"


class BreakEvenGraph extends React.Component {
  breakEvenData= [ 
    { 
      x: this.props.breakEvenUnits,
      y: 0
    },
    { x: parseInt(this.props.breakEvenUnits),
      y: parseFloat(this.props.breakEvenSales)
    } 
  ]

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <h3>Break-even Graph</h3>
          <Label basic size='small'>
            <Icon name='breakEven circle' />Break-Even Point</Label>
          <LineChart data={this.breakEvenData} color={'#007DBC'}  />
        </Card.Content>
      </Card>   
    );
  }
}

export default BreakEvenGraph