import React from "react"
import "./lineChart.less"

class LineChart extends React.Component { 

  // GET X & Y || MAX & MIN
  getX = () => {
    const {data} = this.props;
    return {
      min: 0,
      max: data[data.length - 1].x * 2
    }
  }

  getY = () => {
    const {data} = this.props;

    return {
      min: data.reduce((min, p) => p.y < min ? p.y : min, data[0].y),
      upperMid: data.reduce((max, p) => p.y > max ? (p.y * 3/4) : max, data[0].y),
      mid: data.reduce((max, p) => p.y > max ? p.y/2 : max, data[0].y),
      lowerMid: data.reduce((max, p) => p.y > max ? (p.y * 1/4) : max, data[0].y),
      max: data.reduce((max, p) => p.y > max ? (p.y * 1/1) : max, data[0].y),
    }
  }

   // GET SVG COORDINATES
  getSvgX = (x) => {
    const {svgWidth, yLabelSize} = this.props;
    return yLabelSize + (x / this.getX().max * (svgWidth - yLabelSize));
  }

  getSvgY = (y) => {
    const {svgHeight, xLabelSize} = this.props;
    const gY = this.getY();
    return ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / (gY.max - gY.min);
  }
  
  // BUILD SVG PATH
  makePath = () => {
    const {data, color} = this.props;
    const svgX = this.getSvgX(data[0].x)
    let pathD = `M ${svgX} ${this.getSvgY(data[0].y) } `

    pathD += data.map((point, i) => {
      return `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)} `
    });

    return (
      <path className="lineChartPath" d={pathD} style={{stroke: color}} />
    );
  }
  
  // BUILD GRID AXIS
  makeAxis = () => {
    const {yLabelSize} = this.props;
    const x = this.getX();
    const y = this.getY();

    return (
      <g className='lineChartAxis' key='lineChartAxis'>
        {/* X AXIS */}
        <line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.min)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)}
          strokeDasharray="5" />
        {/* Y AXIS */}
        <line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.max)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)}
          strokeDasharray="5" />
      </g>
    );
  }

  makeLabels = () => {
    const {svgHeight, svgWidth, xLabelSize, yLabelSize} = this.props;
    const padding = 5;
    const xValues = [{ width: 0, value: this.getX().min}]
    
    for (let index = 1; index < 11; index++) {
      xValues.push({width: (svgWidth*index/10)+15, value:  Math.round( this.getX().max*index/10 )})
    }
   
    const yValues = [
      { width: (svgHeight - xLabelSize - padding) * 1/16, 
        value: this.getY().max.toLocaleString('us-EN',{ style: 'currency', currency: 'USD'} )
      },
      { width: (svgHeight - xLabelSize - padding) * 1/4, 
        value: this.getY().upperMid.toLocaleString('us-EN',{ style: 'currency', currency: 'USD'} )
      },
      { width: (svgHeight - xLabelSize - padding)/2, 
        value: this.getY().mid.toLocaleString('us-EN',{ style: 'currency', currency: 'USD'} )
      },
      { width: (svgHeight - xLabelSize - padding) * 3/4, 
        value: this.getY().lowerMid.toLocaleString('us-EN',{ style: 'currency', currency: 'USD'} )
      },
      { width: (svgHeight - xLabelSize - padding) * 1, 
        value: this.getY().min.toLocaleString('us-EN',{ style: 'currency', currency: 'USD'} )
      }
    ]

    return(
      <g className='lineChartLabel' key='lineChartLabel'>
        {/* Y AXIS LABELS */}
        { yValues.map((yval) => {
          return(
            <text transform={`translate(${yLabelSize/2}, ${yval.width})`} textAnchor='middle'>
             { yval.value}
            </text>
          )
        })}

        {/* X AXIS LABELS */}
        { xValues.map((xval) => {
          return (<text transform={`translate(${xval.width}, ${svgHeight})`} textAnchor='start'>
           { xval.value }
          </text>)
        })}
      </g>
    )
  }
  
  render() {
    const {svgHeight, svgWidth} = this.props;

    return (
      <svg  width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth-100} ${svgHeight}`} className={'lineChart'}>
        <g key='lineChart'>
          {this.makeAxis()}
          {this.makePath()}
          {this.makeLabels()}
        </g>
      </svg>
    );
  }
}
// DEFAULT PROPS
LineChart.defaultProps = {
  data: [],
  color: '#2196F3',
  pointRadius: 5,
  svgHeight: 500,
  svgWidth: 1000,
  xLabelSize: 20,
  yLabelSize: 60
}

export default LineChart