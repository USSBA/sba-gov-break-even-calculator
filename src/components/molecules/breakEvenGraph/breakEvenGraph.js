import React from 'react'
import { Card, Icon, Label } from 'semantic-ui-react'
import { BreakEvenGraphData } from '../../atoms'
import './breakEvenGraph.less'
import * as d3 from 'd3';

const drawLineChart = (data) => {
  //Clean out the SVG
  d3.select('#lineChart > *').remove()

  const dollarFormat = function(d) { return "$" + d3.format(",.2f")(d); } 

  const svgWidth = 800, svgHeight = 330;
  const svg = d3.select('#lineChart')
    .append("svg")
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
 
  const margin = { top: 15, right: 20, bottom: 30, left: 50 };
  const g = svg.append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;
  
  // Scale Y
  const y = d3.scaleLinear()
    .domain([0, Math.max( data.totalCost.data[1].y, data.breakEven.data[1].y )])
    .range([height, 0])

  // Scale X
  const x = d3.scaleLinear()
    .domain([0, data.breakEven.data[1].x*2])
    .range([0, width])

  const line = d3.line()
    .x((d) => x(d.x))
    .y((d) =>y(d.y))

  const paths = ['totalCost', 'breakEven']

  // X - Axis
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(9))
    .selectAll("text")
    .attr("dy", "1.2em")
    .attr("transform", "" )

  // Y - Axis
  g.append("g")
    .call(d3.axisLeft(y).tickFormat(dollarFormat).ticks(5))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -180)
    .attr("dy", "0.71em")

  // draw break even line
  paths.map(path => (
    g.append("path")
      .datum(data[path].data)
      .attr("fill", "none")
      .attr("stroke", data[path].lineColor)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3)
      .attr('class', `${path}Line`)
      .attr("d", line)
  ))
  
  // plot the break even point
  g.selectAll("dot")
    .data(data.breakEvenPoint.data)
    .enter()
    .append("circle")
    .attr("r", 9)
    .attr("cx", function(d) { return x(d.x); })
    .attr("cy", function(d) { return y(d.y); })
    .attr("fill", data.breakEvenPoint.color)
    .attr('id', 'breakEvenCircle')

}
class BreakEvenGraph extends React.Component {
  componentDidMount() {
    drawLineChart(BreakEvenGraphData(this.props))
  }

  componentDidUpdate() {
    drawLineChart(BreakEvenGraphData(this.props))
  }
  
  render() {
    return (
      <Card fluid>
        <Card.Content id='breakEvenGraph'>
          <h3>Break-even Point Graph</h3>
          <Label basic size='small'>
            <Icon className='breakEven' name='circle' />Break-Even Point
          </Label>
          <Label basic size='small'>
            <Icon className='totalCost' name='circle' />Total Costs
          </Label>
          <div>
            <div id="lineChart"></div>
            <div className='unitLabel'>Units</div>
            <div className="tooltip" >
                <div className="units">100</div>
                <div>Break-Even<br/>Units Sold</div>
            </div>
          </div>
        </Card.Content>
      </Card>   
    );
  }
}

export default BreakEvenGraph