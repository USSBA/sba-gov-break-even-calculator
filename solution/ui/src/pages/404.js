import React from "react"

import { Button, Container, Image } from 'semantic-ui-react'
import SEO from "../components/seo"
import logo from '../images/sba-logo-horizontal.jpg'

import './404.less'

const NotFoundPage = () => (
  <div className='notFoundContainer'>
    <SEO title="404: Not found" />
    <header>
      <Image className='SBAlogo' src={logo} alt='Small Business Administration' />  
    </header>
    <Container role="main" className='notFoundText' textAlign='center' text>
      <h1>Something went wrong</h1>
      <p>Click the button below to be taken back to the Break-Even Calculator welcome page.</p>
      <Button as='a' href='/breakevenpointcalculator' color='blue'>BREAK-EVEN CALCULATOR</Button>
    </Container>
  </div>
)

export default NotFoundPage
