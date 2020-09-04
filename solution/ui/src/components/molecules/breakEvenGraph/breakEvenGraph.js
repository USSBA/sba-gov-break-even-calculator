import React from 'react'
import { Card, Label } from 'semantic-ui-react'
import { formatBreakEvenGraphData, formatNumber } from '../../../helpers'
import './breakEvenGraph.less'
import * as d3 from 'd3';

const drawLineChart = (data, windowWidth) => {
  console.log('window', windowWidth)
  //Clean out the SVG
  d3.select('#lineChart > *').remove()

  const dollarFormat = function(d) { return "$" + d3.format(",.2f")(d); } 

  const mobileBreakpoint = 768;
  const svgWidth = 800; 
  const svgHeight = windowWidth > mobileBreakpoint ? 330 : 700;
  const svgVerticalOffset = windowWidth > mobileBreakpoint ? 0 : 15;

  const svg = d3.select('#lineChart')
    .append("svg")
    .attr("viewBox", `0 ${svgVerticalOffset} ${svgWidth} ${svgHeight}`)
 
  const margin = { 
    top: 15, 
    right: 20, 
    bottom: 30, 
    left: windowWidth > mobileBreakpoint ? 50 : 110 };

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

  const paths = ['totalCost', 'breakEven','fixedCost', 'unitSales']

  // X - Axis
  g.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(9))
    .selectAll("text")
    .attr("dy", "1.2em")
    .attr("transform", "" )

  // Y - Axis
  g.append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y).tickFormat(dollarFormat).ticks(5))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -180)
    .attr("dy", "0.71em")

  // Y Grid Lines
  g.append("g")
    .call(d3.axisLeft(y).tickFormat('').ticks(5).tickSize(-width))
    .attr("class", "yGridLines")

  // draw line
  paths.map(path => (
    g.append("path")
      .datum(data[path].data)
      .attr("fill", "none")
      .attr("stroke", data[path].lineColor)
      .attr("stroke-dasharray", data[path].stroke)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "butt")
      .attr("stroke-width", windowWidth > mobileBreakpoint ? 4 : 7)
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
    .style("stroke",  "white")
    .style("stroke-width", "3px")
    .attr("fill", data.breakEvenPoint.color)
    .attr('id', 'breakEvenCircle')
}

class BreakEvenGraph extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => drawLineChart(formatBreakEvenGraphData(this.props), window.innerWidth));
    drawLineChart(formatBreakEvenGraphData(this.props), window.innerWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => drawLineChart(formatBreakEvenGraphData(this.props), window.innerWidth));
  }

  componentDidUpdate() {
    drawLineChart(formatBreakEvenGraphData(this.props), window.innerWidth)
  }
  
  render() {
    return (
      <Card fluid>
        <Card.Content id='breakEvenGraph'>
          <h3>Break-Even Point Graph</h3>
          <Label className='graphLineLabel' basic size='small'>
            Unit Sales
            <svg className="lineLegend" height="20" width="60">
              <g fill="none" stroke="#00518B" stroke-width="10">
                <path stroke-dasharray="5,10" d="M5 20 l215 0" />
              </g>
            </svg>
          </Label>
          <Label className='graphLineLabel' basic size='small'>
            Break-Even Point
            <svg className="lineLegend" height="20" width="90">
              <g fill="none" stroke="#007dbc" stroke-width="10">
                <path stroke-dasharray="0" d="M5 20 l215 0" />
              </g>
            </svg>
          </Label>
          <Label className='graphLineLabel' basic size='small'>
            Total Costs
            <svg className="lineLegend" height="20" width="80">
              <g fill="none" stroke="#197E4E" stroke-width="10">
                <path stroke-dasharray="10,10" d="M5 20 l215 0" />
              </g>
            </svg>
          </Label>
          <Label className='graphLineLabel' basic size='small'>
            Fixed Costs
            <svg className="lineLegend" height="20" width="70">
              <g fill="none" stroke="#FF4F30" stroke-width="10">
                <path stroke-dasharray="5,5" d="M5 20 l215 0" />
              </g>
            </svg>
          </Label>
          <div class="graphContainer">
            <div id="lineChart"></div>
            <div className='unitLabel'>Units</div>
            <Card fluid className="tooltip" >
                <div className="units number">
                  { formatNumber(formatBreakEvenGraphData(this.props).breakEvenPoint.data[0].x) }
                </div>
                <div>Break-Even</div>
                <div>Units Sold</div>
            </Card>
          </div>
        </Card.Content>
      </Card>   
    );
  }
}

export default BreakEvenGraph
