export const BreakEvenGraphData = (props) => { 
  const totalCost = parseInt(Math.round((props.variableCost*props.breakEvenUnits)))+
                    parseInt(props.fixedCost)
                       
  const maxTotalCost = parseInt(Math.round((props.variableCost*props.breakEvenUnits*2)))+
  parseInt(props.fixedCost)

  return {
    breakEven: {
      lineColor: "#007dbc",
      data: [ 
        { x: props.breakEvenUnits, y: 0 },
        { x: props.breakEvenUnits, y: props.breakEvenSales*2 }
      ],
    },
    totalCost: {
      lineColor: '#686868',
      data: [ 
        { x: 0, y: props.fixedCost},
        { x: props.breakEvenUnits*2, y: maxTotalCost }
      ]
    },
    fixedCost: {
      lineColor: '#969696',
      data: [ 
        { x: 0, y: props.fixedCost},
        { x: props.breakEvenUnits*2, y: props.fixedCost}
      ]
    },
    breakEvenPoint: {
      color: "#007dbc",
      data: [
        {  x: props.breakEvenUnits, y: totalCost }
      ]
    }
  }
}
