import {
  axisLeft,
  axisBottom,
  format,
  timeFormat,
  scaleTime,
  scaleLinear,
  curveMonotoneX,
  line as d3Line,
  select,
} from 'd3';
import _ from 'lodash';

/**
 * draw elements of the chart based on current settings
 */
const drawAxes = () => {
  select('.line-chart-xaxis')
    .call(xAxis);

  select('.line-chart-yaxis')
    .call(yAxis);
}

const drawLine = (data) => {
  const line = d3Line()
    .x(scaleXData)
    .y(scaleYData)
    .curve(curveMonotoneX);

  select('.line-chart-line')
    .attr('d', line(data));
}

/**
 * invoke functions to draw appropriate changes
 */
const renderChanges = (data) => {
  drawAxes();
  drawLine(data);
}

/**
 * Call all functions necessary to set up the chart
 */
d3Utils.initializeChart = (data) => {
  buildAxes();
  buildLine();
  renderChanges(data);
}

/**
 * build the elements that will be contained within our main SVG
 */
const buildAxes = () => {
  select('.line-chart')
    .append('g')
    .attr('class', 'line-chart-yaxis');

  select('.line-chart')
    .append('g')
    .attr('class', 'line-chart-xaxis')
};

const buildLine = () => {
  select('.line-chart')
    .append('path')
    .attr('class', 'line-chart-line')
};

/**
 * create x- and y-scales
 */
const xScale =
  scaleTime()
    .domain([dateUtils.getStartOfMonth(new Date()), new Date()])
    .range([0, d3Config.maxChartWidth]);

const yScale =
  scaleLinear()
    .domain([0, d3Config.defaultMaxYValue])
    .range([d3Config.maxChartHeight, 0]);

/**
 * scale data points according to their respective domain/range configuration
 */
const scaleXData = (point) => {
  return xScale(new Date(point.timestamp));
}

const scaleYData = (point) => {
  return yScale(point.value);
}

/**
 * create x- and y-axes
 */
const yAxis =
  axisLeft(yScale)
    .ticks(5)
    .tickFormat(format(d3Config.numberFormat));

const xAxis =
  axisBottom(xScale)
    .ticks(5)
    .tickFormat(timeFormat(d3Config.dateFormat));

/**
 * Adjust the y-scale based on data values given
 */
const adjustYScale = (data) => {
  const maxPoint = _.maxBy(data, point => point.value);
  const maxY = _.max([maxPoint.value, d3Config.defaultMaxYValue]);
  yScale.domain([0, maxY]);
}

/**
 * Adjust the x-scale to fit the settings required by the given time frame
 */
const adjustXScale = (data, timeFrame) => {
  const date = new Date();
  let startDate;

  switch (timeFrame) {
    case 'monthToDate':
      startDate = dateUtils.getStartOfMonth(date);
      break;
    case 'oneYear':
      startDate = dateUtils.subtract(date, 12, 'month');
      break;
    default:
      startDate = new Date(_.first(data).timestamp);
  }
  xScale.domain([startDate, date]);
}

/**
 * invoke necessary functions to update the chart with new data
 */
d3Utils.handleNewData = (data, timeFrame) => {
  adjustYScale(data);
  adjustXScale(data, option);
  renderChanges(data);
}

d3Utils.setWidth = (data) => {
  const svg = document.getElementsByClassName('line-chart');
  const svgWidth = svg[0].getBoundingClientRect().width
  xScale.range([0, svgWidth]);
  renderChanges(data);
}