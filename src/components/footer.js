import React from 'react'
import '../styles/footer.less'
import logo from '../images/sba_400x400.jpg'
import { Image, Divider, Grid } from 'semantic-ui-react'

const Footer = () => (
  <Grid className='footer' columns={1}>
    <Grid.Column textAlign='center'>
      <div className='footer-divider'></div>
      <Image src={logo} size='tiny' alt='Small Business Administration' centered />
      U.S. Small Business Administration | 409 3rd St, SW. Washington DC 20416
    </Grid.Column>
  </Grid>
)

export default Footer