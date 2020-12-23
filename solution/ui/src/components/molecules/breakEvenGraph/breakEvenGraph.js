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

export const drawLineChart = (data, windowWidth) => {
  //Clean out the SVG
  d3.selectAll('#lineChart > *').remove()

  let g, x, y
  let mouseG, becs
  let shouldHideBep = false;
  const mobileBreakpoint = 768;
  const svgWidth = 800; 
  const svgHeight = windowWidth > mobileBreakpoint ? 330 : 700;
  const svgVerticalOffset = windowWidth > mobileBreakpoint ? 0 : 15;

  const margin = { 
    top: windowWidth > mobileBreakpoint ? 15 : 90, 
    right: 20, 
    bottom: windowWidth > mobileBreakpoint ? 30 : 50, 
    left: windowWidth > mobileBreakpoint ? 60 : 110 
  };
    
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const line = d3.line()
    .x((d) => x(d.x))
    .y((d) =>y(d.y))


  const updateTooltipsVisibility = () => {
    d3.selectAll(".breakEvenLabel.tooltip")
      .style('display', `${shouldHideBep ? 'none' : 'block'}`)

    d3.selectAll('#tooltip, .mouse-line, .mouse-per-line circle')
      .style('display', `${shouldHideBep ? 'block' : 'none'}`)
      .style('opacity', `${shouldHideBep ? '1' : '0'}`);
  }

  const initialSetUp = () => {
    const svg = d3.select('#lineChart')
      .append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr('viewBox', `0 ${svgVerticalOffset} ${svgWidth} ${svgHeight}`)
      .attr('role','img')
      .attr('aria-label', `This image is a line graph representation of the break even point at ${data.breakEvenPoint.data[0].x} Units Sold and the data table below`)
  
    g = svg.append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

    // Scale Y
    y = d3.scaleLinear()
      .domain([0, Math.max( data.totalCost.data[1].y, data.breakEven.data[1].y )])
      .range([height, 0])

    // Scale X
    x = d3.scaleLinear()
      .domain([0, data.breakEven.data[1].x*2])
      .range([0, width])

    // Y Grid Lines
    g.append('g')
      .call(d3.axisLeft(y).tickFormat('').ticks(5).tickSize(-width))
      .attr('class', 'yGridLines')

    // Format the data
    becs = Object.keys(data).map(function(key) {
      if (key !=='breakEven' && key !== 'breakEvenPoint') {
        return { 
          name: key,
          values: data[key].data,
          label: data[key].label,
          color: data[key].lineColor
        }
      }
    }).filter(Boolean)
  }

  const drawAxes = () => {
    const dollarFormat = function(d) {
      return d3.format('$,.2s')(d)
    }
    const unitsFormat = function(d) {
      if(d.toString().length < 4) {
        return d3.format(',')(d)
      }
      return d3.format(',.2s')(d)
    }
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
  }

  const drawLines = () => {
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
        .attr('transform',function(d){ return "translate("+(x(d.x))+","+(y(d.y))+")"; })
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
  }

  const setUpInteractiveTooltip = () => {
    // Create Area for listening to mouse events
    mouseG = g.append('g')
      .attr('class', 'mouse-over-effects');

    // Draw the black vertical line to follow mouse
    mouseG.append('path')
      .attr('class', 'mouse-line')
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .style('opacity', '0');

    const becLines = document.getElementsByClassName('line');
  
    
    // The area where the mouse hovers
    const mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(becs)
      .enter()
      .append('g')
      .attr('class', 'mouse-per-line')
  
    mousePerLine.append('circle')
      .attr('r', 4)
      .style('fill', 'none')
      .style('stroke-width', '1px')
      .style('opacity', '0')
      .attr('stroke', function(d) {
        return d.color
      })
  
    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('class', 'graphCanvas')
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select('.mouse-line')
          .style('opacity', '1');
        d3.selectAll('.mouse-per-line circle')
          .style('opacity', `${shouldHideBep ? '1' : '0'}`);
      })
      .on('click mousemove touchmove focus', function() {
        if(d3.event.type === 'click') {
          shouldHideBep = true;
          updateTooltipsVisibility()
        }
        if(!shouldHideBep) return;
        let mouse = d3.mouse(this);
        let obj = [];
        d3.select('.mouse-line')
          .attr('d', function() {
            let d = 'M' + mouse[0] + ',' + height;
            d += ' ' + mouse[0] + ',' + 0;
            return d;
          });
        d3.selectAll('.mouse-per-line') 
          .attr('transform', function(d, i) {
            if(becLines[i]) {
              let beginning = 0,
                  end = becLines[i].getTotalLength(),
                  target = null,
                  pos;
              let positionFound = false
              while (!positionFound) {
                target = Math.floor((beginning + end) / 2);
                pos = becLines[i].getPointAtLength(target);
                if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                    break;
                }
                if (pos.x > mouse[0])      
                  end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else positionFound = true;
              }
              obj.push({cost: Math.floor(y.invert(pos.y).toFixed(2)), 
                        unit: x.invert(mouse[0])})
              return 'translate(' + mouse[0] + ',' + pos.y +')';
            }
          });
          updateTooltipContent(obj,Math.floor(x.invert(mouse[0]))) 
      });

      // Plot the break even point
      g.selectAll('dot')
        .data(data.breakEvenPoint.data)
        .enter()
        .append('circle')
        .attr('pointer-events', 'click')
        .attr('r', windowWidth > mobileBreakpoint ? 9 : 16)
        .attr('cx', function(d) { return x(d.x); })
        .attr('cy', function(d) { return y(d.y); })
        .style('stroke',  'white')
        .style('stroke-width', '3px')
        .style('cursor', 'pointer')
        .attr('fill', data.breakEvenPoint.color)
        .attr('id', 'breakEvenCircle')
        .on('click', () => {
          shouldHideBep = !shouldHideBep;
          updateTooltipsVisibility()
        })
  }

  const updateTooltipContent = (obj,unit) => {
    let tooltipData = [];
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
    let tooltipClass = data['breakEven'].data[1].x < unit ? 'tooltipLeft' : 'tooltipRight'
    d3.select('#tooltip').html('Units: ' + unit)
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

  const detectClickOutside = () => {
    function equalToEventTarget() {
      return this == d3.event.target;
    }

    const insideGraph = d3.selectAll('.graphCanvas, .graphCanvas *, .bec, .bec *, .becLine, #breakEvenCircle, #breakEvenCircle *')
  
    d3.select('body').on('click', () => {
      const outside = insideGraph.filter((equalToEventTarget)).empty()
      if(outside) {
        shouldHideBep = false
        updateTooltipsVisibility()
        d3.select('#lineChart')
          .style('cursor', 'pointer')
      }
    })
  }

  initialSetUp()
  drawAxes()
  drawLines()
  setUpInteractiveTooltip()
  detectClickOutside()
}
export class BreakEvenGraph extends React.Component {
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
                <Image src={graphIcon} centered alt='graph icon' size='tiny' left='true'/>              
              </Grid.Column>
              <Grid.Column computer={5} tablet={10} mobile={12} stretched>
                <h3>Break-Even Point Graph</h3>
                <div className='subtext'>
                  Graphical representation of your inputs. Click or tap in the graph for 
                  detailed values.
                </div>
              </Grid.Column>
              <Grid.Column textAlign='center' computer={9} tablet={16} mobile={16}>
                <Image className='labelImg' src={unitSalesImg} alt='unit sales label' size='small' left='true'/>
                <Image className='labelImg' src={totalCostImg} alt='total cost label' size='small' left='true'/>              
                <Image className='labelImg' src={fixedCostImg} alt='fixed cost label' size='small' left='true'/> 
                <Image className='labelImg' src={breakEvenPointImg} alt='breakeven point label' size='small' left='true'/>                           
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className='graphContainer'>
                  <div id='lineChart' data-testid='graph'></div>
                  <div className='unitLabel' data-testid='unit-sold' aria-hidden='true'>Units Sold</div>
                  <div id='tooltip'></div>
                  <Card data-testid='breakevenLabel' fluid className='tooltip breakEvenLabel' >	
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
