import React from 'react'
import { Card, Icon, Label } from 'semantic-ui-react'
import "./breakEvenGraph.less"
import * as d3 from 'd3';

const drawLineChart = (data) => {
  //Clean out the SVG
  d3.select('#lineChart > *').remove()

  const dollarFormat = function(d) { return "$" + d3.format(",.2f")(d); }

  const svgWidth = 800, svgHeight = 500;
  const svg = d3.select('#lineChart')
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)

  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const g = svg.append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const y = d3.scaleLinear()
    .domain(d3.extent(data, (d) => d.y))
    .range([height, 0])

  const x = d3.scaleLinear()
    .domain([0, data[1].x*2])
    .range([0, width])

  const breakEvenLine = d3.line()
    .x((d) => x(d.x))
    .y((d) =>y(d.y))

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
    .attr("text-anchor", "end")

    g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#007dbc")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3)
    .attr("d", breakEvenLine)
}

class BreakEvenGraph extends React.Component {

  componentDidMount() {
    drawLineChart(breakEvenData(this.props))
  }

  componentDidUpdate() {
    drawLineChart(breakEvenData(this.props))
  }

  render() {

    return (
      <Card fluid>
        <Card.Content id='breakEvenGraph'>
          <h3>Break-even Graph</h3>
          <Label basic size='small'>
            <Icon className='breakEven' name='circle' />Break-Even Point
          </Label>
          <div>
            <svg id="lineChart"></svg>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default BreakEvenGraph

const breakEvenData = (props) => [
  { x: props.breakEvenUnits, y: 0},
  { x: props.breakEvenUnits, y: props.breakEvenSales}
]
