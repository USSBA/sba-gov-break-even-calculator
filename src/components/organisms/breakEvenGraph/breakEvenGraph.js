import React, {Component} from 'react'
import LineChart from './lineChart.js';


class BreakEvenGraph extends React.Component {
  createFakeData(){
    // This function creates data that doesn't look entirely random
    const data = []

    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }

  render() {
    return (
      <div className="BreakEvenGraph">
        <h3>Break-Even Graph</h3>
        <LineChart data={this.createFakeData()} color={'#F44336'}  />
      </div>
    );
  }
}

BreakEvenGraph.defaultProps = {
  data: [],
  color: '#2196F3',
  svgHeight: 300,
  svgWidth: 700
}

export default BreakEvenGraph