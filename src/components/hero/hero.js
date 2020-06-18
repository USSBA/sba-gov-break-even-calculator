import React from 'react'
import { Image } from 'semantic-ui-react'
import calculatorIcon from '../../images/calculator_icon.svg'
import './hero.less'


const Hero = (Props) => {
  return(
    <div className='heroContainer'>
      <Image src={calculatorIcon} alt='calculator icon' size='small' centered/>
      <div className='blueGradient'></div>
    </div>
  )
}

export default Hero