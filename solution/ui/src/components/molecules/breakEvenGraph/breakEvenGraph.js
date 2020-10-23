import React from 'react'
import { Image, Card, Grid } from 'semantic-ui-react'
import { formatBreakEvenGraphData, formatNumber } from '../../../helpers'
import './breakEvenGraph.less'
import * as d3 from 'd3';
import graphIcon from '../../../images/graph_icon.svg'
import fixedCostImg from '../../../images/fixed_costs.svg'
import unitSalesImg from '../../../images/unit_sales.svg'
import breakEvenPointImg from '../../../images/breakeven_point.svg'
import totalCostImg from '../../../images/total_costs.svg'

const drawLineChart = (data, windowWidth) => {
  //Clean out the SVG
  d3.selectAll('#lineChart > *').remove()

  var tooltip
  var mouseG
  const mobileBreakpoint = 768;
  const svgWidth = 800; 
  const svgHeight = windowWidth > mobileBreakpoint ? 330 : 700;
  const svgVerticalOffset = windowWidth > mobileBreakpoint ? 0 : 15;

  const dollarFormat = function(d) {
    return d3.format('$,.2s')(d)
  }
  const unitsFormat = function(d) {
    if(d.toString().length < 4) {
      return d3.format(',')(d)
    }
    return d3.format(',.2s')(d)
  }

  const svg = d3.select('div#lineChart')
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr('viewBox', `0 ${svgVerticalOffset} ${svgWidth} ${svgHeight}`)
    .attr('aria-labelledby','breakEvenTitle breakEvenDescription')
    .attr('role','img')

  svg.append('title')
    .text('Break-Even Point Line graph')
    .attr('id','breakEvenTitle')
  svg.append('desc')
    .text('This image is a line graph representation of the data table below.')
    .attr('id','breakEvenDescription')
 
  const margin = { 
    top: windowWidth > mobileBreakpoint ? 15 : 90, 
    right: 20, 
    bottom: windowWidth > mobileBreakpoint ? 30 : 50, 
    left: windowWidth > mobileBreakpoint ? 60 : 110 };

  const g = svg.append('g')
    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
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

  // X - Axis
  g.append('g')
    .attr('class', 'xAxis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickFormat(unitsFormat).ticks(9))
    .selectAll('text')
    .attr('dy', '1.2em')

  // Y - Axis
  g.append('g')
    .attr('class', 'yAxis')
    .call(d3.axisLeft(y).tickFormat(dollarFormat).ticks(5))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', -40)
    .attr('x', -180)
    .attr('dy', '0.71em')

  // Y Grid Lines
  g.append('g')
    .call(d3.axisLeft(y).tickFormat('').ticks(5).tickSize(-width))
    .attr('class', 'yGridLines')

   // Create Hover Tooltip 
   mouseG = g.append('g')
      .attr('class', 'mouse-over-effects');

  tooltip = d3.selectAll("#lineChart").append("div")
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('padding', 6)
      .style('display', 'none')
  
  const lines = ['totalCost', 'fixedCost', 'unitSales']

  // Draw line
  lines.map(path => (
    g.append('g')
    .attr('class','bec')
    .append('path')
      .datum(data[path].data)
      .attr('fill', 'none')
      .attr('stroke', data[path].lineColor)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'butt')
      .attr('stroke-width', windowWidth > mobileBreakpoint ? 2 : 3)
      .attr('class', `${path}Line`)
      .attr('class','becLine')
      .attr('d', line)
      .attr('class', 'line')
  ))

  // Plot the shapes
  lines.map(path => (
    g.selectAll("dot")
      .data([data[path].data[data[path].data.length-1]])
      .enter()
      .append('path')
      .attr('d',d3.symbol().type(d3[`symbol${data[path].shape}`]))
      .attr('fill', data[path].lineColor)
      .attr('transform',function(d,i){ return "translate("+(x(d.x))+","+(y(d.y))+")"; })
  ))

  // Draw the break even line
  g.append('g')
    .append('path')
      .datum(data['breakEven'].data)
      .attr('fill', 'none')
      .attr('stroke', data['breakEven'].lineColor)
      .attr('stroke-width', 4)
      .attr('class', `breakEvenLine`)
      .attr('class','becLine')
      .attr('d', line)


  // Draw the black vertical line to follow mouse
  mouseG.append('path')
    .attr('class', 'mouse-line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .style('opacity', '0');

  var becLines = document.getElementsByClassName('line');

  // Format the data
  var becs = Object.keys(data).map(function(key) {
    if (key !=='breakEven' && key !== 'breakEvenPoint') {
      return { name: key,
               values: data[key].data,
               label: data[key].label,
               color: data[key].lineColor
      }
    }
  }).filter(Boolean)

  // Plot the break even point
  g.selectAll('dot')
    .data(data.breakEvenPoint.data)
    .enter()
    .append('circle')
    .attr('r', windowWidth > mobileBreakpoint ? 9 : 16)
    .attr('cx', function(d) { return x(d.x); })
    .attr('cy', function(d) { return y(d.y); })
    .style('stroke',  'white')
    .style('stroke-width', '3px')
    .attr('fill', data.breakEvenPoint.color)
    .attr('id', 'breakEvenCircle')
  
  // The area where the mouse hovers
  var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(becs)
    .enter()
    .append('g')
    .attr('class', 'mouse-per-line')

  mousePerLine.append('circle')
    .attr('r', 4)
    .style('stroke', data['unitSales'].lineColor)
    .style('fill', 'none')
    .style('stroke-width', '1px')
    .style('opacity', '0')

  mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseover', function() { // on mouse in show line, circles and text
      d3.select('.mouse-line')
        .style('opacity', '1');
      d3.selectAll('.mouse-per-line circle')
        .style('opacity', '1');
      d3.selectAll("#tooltip")
        .style('display', 'block')
    })
    .on('mousemove touchmove focus', function() {
      var mouse = d3.mouse(this);
      var obj = [];
      d3.select('.mouse-line')
        .attr('d', function() {
          var d = 'M' + mouse[0] + ',' + height;
          d += ' ' + mouse[0] + ',' + 0;
          return d;
        });
      d3.selectAll('.mouse-per-line') 
        .attr('transform', function(d, i) {
          if(becLines[i]) {
            var beginning = 0,
                end = becLines[i].getTotalLength(),
                target = null;
            while (true){
              target = Math.floor((beginning + end) / 2);
              var pos = becLines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            obj.push({cost: Math.floor(y.invert(pos.y).toFixed(2)), 
                      unit: x.invert(mouse[0])})
            return 'translate(' + mouse[0] + ',' + pos.y +')';
          }
        });
        updateTooltipContent(obj,Math.floor(x.invert(mouse[0]))) 
    });
    
  function updateTooltipContent(obj,unit) {
    var tooltipData = [];
    if(becs) {
      obj.map((d,i) => {
        tooltipData.push({
          label: becs[i].label,
          color: becs[i].color,
          cost: d.cost,
          unit: d.unit,
          name: becs[i].name
        })
      })
    }

    tooltipData = tooltipData.reverse()
    // move tooltip to left of the line after your values are higher 
    // than breakeven point.
    var tooltipClass = data['breakEven'].data[1].x < unit ? 'tooltipLeft' : 'tooltipRight'
    tooltip.html('Units: ' + unit)
      .attr('class', tooltipClass)
      .style('display', 'block')
      .style('left', d3.event.layerX + 20 + 'px')
      .style('top', d3.event.layerY + 'px')
      .selectAll()
      .data(tooltipData).enter()
      .append('div')
      .attr('class', d => d.name)
      .style('color', d => d.color)
      .html(d => d.label + ': ' +  "$" + d3.format(",")(d.cost))
  }
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
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column textAlign='center' computer={2} tablet={2} mobile={4}>
                <Image src={graphIcon} centered alt='graph icon' size='tiny' left/>              
              </Grid.Column>
              <Grid.Column computer={5} tablet={10} mobile={12} stretched>
                <h3>Break-Even Point Graph</h3>
                <div className='subtext'>
                  Graphical representation of your inputs. Click or tap in the graph for 
                  detailed values.
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center' computer={9} tablet={16} mobile={16}>
                <Image className='labelImg' src={unitSalesImg} alt='unit sales label' size='small' left/>
                <Image className='labelImg' src={totalCostImg} alt='total cost label' size='small' left/>              
                <Image className='labelImg' src={fixedCostImg} alt='fixed cost label' size='small' left/> 
                <Image className='labelImg' src={breakEvenPointImg} alt='breakeven point label' size='small' left/>                           
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className='graphContainer'>
                <div id='lineChart'></div>
                <div className='unitLabel' aria-hidden='true'>Units</div>
                  <Card fluid className='tooltip breakEvenLabel' >
                    <div className='units number'>
                      { formatNumber(formatBreakEvenGraphData(this.props).breakEvenPoint.data[0].x) }
                    </div>
                    <div>Break-Even</div>
                    <div>Units Sold</div>
                  </Card>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>   
    );
  }
}

export default BreakEvenGraph
