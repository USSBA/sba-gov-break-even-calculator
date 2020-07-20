export const BreakEvenGraphData = (props) => { 
  return {
    breakEven: {
      lineColor: "#007dbc",
      data: [ 
        { x: props.breakEvenUnits, y: 0},
        { x: props.breakEvenUnits, y: props.breakEvenSales}
      ],
    },
    fixedCost: {
      lineColor: '#969696',
      data: [ 
        { x: 0, y: 0},
        { x: props.breakEvenUnits, y: props.fixedCost*2}
      ]
    }
  }
}