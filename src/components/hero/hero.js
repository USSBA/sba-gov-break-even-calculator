import React from 'react'
import { Image } from 'semantic-ui-react'
import calculatorIcon from '../../images/calculator_icon.svg'
import './hero.less'


const Hero = (Props) => {
  return(
    <div className='heroContainer'>
      <Image src={calculatorIcon} alt='calculator icon' size='small' centered/>
      <div className='blueGradient'>
        <h1>Break-Even Point Analysis Tool</h1>
        <p>This calculator will help you determine the break-even point for your business.</p>
        <div className='formula'>
          Fixed Costs ÷ (Price - Variable Costs) = Break-Even Point in Units
        </div>
      </div>
    </div>
  )
}

export default Hero