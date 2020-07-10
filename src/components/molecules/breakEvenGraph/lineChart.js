import React from "react"
import "./lineChart.less"

class LineChart extends React.Component { 

  // GET X & Y || MAX & MIN
  getX(){

    const {data} = this.props;
    return {
      min: 0,
      max: data[data.length - 1].x * 2
    }
  }

  getY(){
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
  getSvgX(x) {
    const {svgWidth, yLabelSize} = this.props;
    return yLabelSize + (x / this.getX().max * (svgWidth - yLabelSize));
  }
  getSvgY(y) {
    const {svgHeight, xLabelSize} = this.props;
    const gY = this.getY();
    return ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / (gY.max - gY.min);
  }
  
  // BUILD SVG PATH
  makePath() {
    const {data, color} = this.props;
    const svgX = this.getSvgX(data[0].x)
    let pathD = "M " + svgX + " " + this.getSvgY(data[0].y) + " ";
    console.log('PATHD',pathD)

    pathD += data.map((point, i) => {
      console.log('PATHD',pathD)

      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    });

    return (
      <path className="linechart_path" d={pathD} style={{stroke: color}} />
    );
  }
  
  // BUILD GRID AXIS
  makeAxis() {
    const {yLabelSize} = this.props;
    const x = this.getX();
    const y = this.getY();

    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.min)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)}
          strokeDasharray="5" />
        <line
          x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.max)}
          x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)}
          strokeDasharray="5" />
      </g>
    );
  }

  makeLabels(){
    const {svgHeight, svgWidth, xLabelSize, yLabelSize} = this.props;
    const padding = 5;
    console.log(this.getX())
    const xvalues = [{ width: 0, value: this.getX().min}]
    
    for (let index = 1; index < 11; index++) {
      xvalues.push({width: (svgWidth*index/10)+15, value: this.getX().max*index/10})
      console.log(xvalues)
    }

    const yvalues = [
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
      <g className="linechart_label">
        {/* Y AXIS LABELS */}
        { yvalues.map((yval) => {
          return(
            <text transform={`translate(${yLabelSize/2}, ${yval.width})`} textAnchor="middle">
             { yval.value}
            </text>
          )
        })}
        {/* X AXIS LABELS */}
        
        { xvalues.map((xval) => {
          return (<text transform={`translate(${xval.width}, ${svgHeight})`} textAnchor="start">
           { xval.value }
          </text>)
        })}
        
      </g>
    )
  }
  
  render() {
    const {svgHeight, svgWidth} = this.props;

    return (
      <svg  width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth-100} ${svgHeight}`} className={'linechart'}
             >
        <g>
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