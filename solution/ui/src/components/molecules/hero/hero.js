import React from 'react'
import PropTypes from 'prop-types'

import { Container, Image } from 'semantic-ui-react'
import calculatorIcon from '../../../images/calculator_icon.svg'
import './hero.less'


const Hero = (props) => {
  return(
    <>
      <div className='heroContainer'>
        <Image src={calculatorIcon} alt='calculator icon' size='small' centered/>
        <div className='blueGradient'>
          <Container>
            <h1>Calculate Your Break-Even Point</h1>
            <p>This calculator will help you determine the break-even point for your business.</p>
            <div className='formula'>
              Fixed Costs ÷ (Price - Variable Costs) = Break-Even Point in Units
            </div>
          </Container>
        </div>
      </div>
      <Container className='heroChildren-container'>
        {props.children}
      </Container>
    </>
  )
}

Hero.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Hero