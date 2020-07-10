import React from 'react'
import LineChart from './lineChart.js'
import { Card, Button} from 'semantic-ui-react'

class BreakEvenGraph extends React.Component {

  breakEvenData= [ { 
            x: this.props.breakEvenUnits,
            y: 0
          },
          { x: parseInt(this.props.breakEvenUnits.replace(/,/g, '')),
            y: parseFloat(this.props.breakEvenSales.replace(/,/g, ''))
          }
        ]
  render() {

    return (
      <Card>
        <Card.Content>
          <h3>Break-even Graph</h3>
          <Button basic size='small'><i aria-hidden="true" class="circle small icon"></i>Break-Even Point</Button>

          <LineChart data={this.breakEvenData} color={'#007DBC'}  />
        </Card.Content>
      </Card>
    );
  }
}

BreakEvenGraph.defaultProps = {
  data: [],
  color: '#2196F3',
  svgHeight: 300,
  svgWidth: 950
}

export default BreakEvenGraph