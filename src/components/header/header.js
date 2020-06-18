import React from 'react'
import logo from '../../images/sba-logo-horizontal.jpg'
import './header.less'
import { Image, Divider, Grid } from 'semantic-ui-react'

const Header = ({ siteTitle }) => (
  <header className='bec-header'>
    <Grid columns={1}>
      <Grid.Column textAlign='center'>
        <Image src={logo} alt='SBA logo' />  
        <Divider />
      </Grid.Column>
    </Grid>
  </header>
)

export default Header