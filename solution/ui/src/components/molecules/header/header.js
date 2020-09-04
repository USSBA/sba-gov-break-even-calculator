import React from 'react'
import logo from '../../../images/sba-logo-horizontal.jpg'
import './header.less'
import { Image, Divider, Grid, Icon } from 'semantic-ui-react'

const Header = ({ siteTitle }) => (
  <header className='bec-header'>
    <Grid columns={1}>
      <Grid.Column textAlign='left'>
        <Image src={logo} alt='Small Business Administration' />  
        <Divider />
        <a className='return-link' href='/breakevenpointcalculator'>
          <Icon name='angle left' />
          Return to break-even page
        </a>
      </Grid.Column>
    </Grid>
  </header>
)

export default Header