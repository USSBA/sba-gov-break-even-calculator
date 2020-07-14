import React from 'react'
import { shallow } from 'enzyme'
import { LineChart }  from '../../atoms'

describe('BreakEvenGraph', () => {
  const breakEvenData= [ 
    { 
      x: 0,
      y: 0
    },
    { x: 250,
      y: 1000
    }
  ]

  const wrapper = shallow(
    <LineChart data={breakEvenData} color={'#007DBC'}  />
  )
  
  const instance = wrapper.instance()

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1)
  })

  it('has max x value is 500', () => {
    expect(instance.getX().max).toEqual(500)
  })

  it('has min x value is 0', () => {
    expect(instance.getX().min).toEqual(0)
  })

  it('has max y value is 1000', () => {
    expect(instance.getY().max).toEqual(1000)
  })

  it('has min y value is 0', () => {
    expect(instance.getY().min).toEqual(0)
  })

  it('returns svg x', () => {
    expect(instance.getSvgX(breakEvenData[1].x)).toEqual(530)
  })

  it('returns svg y', () => {
    expect(instance.getSvgY(breakEvenData[1].y)).toEqual(0)
  })

  it('returns linechart path', () => {
    expect(instance.makePath()).toEqual(<path className='linechart_path' d='M 60 480 L 60 480 ,L 530 0 ' style={{'stroke': '#007DBC'}} />)
  })

  it('max the axes', () => {
    expect(instance.makeAxis()).toEqual(<g className='linechart_axis' key='linechart_axis'><line strokeDasharray='5' x1={0} x2={1000} y1={480} y2={480} /><line strokeDasharray='5' x1={0} x2={1000} y1={0} y2={0} /></g>)
  })
})

