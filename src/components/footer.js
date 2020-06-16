import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import 'semantic-ui-less/semantic.less'
import '../styles/footer.less'
import logo from '../images/sba_400x400.jpg'
import { Container, Image, Divider, Grid } from 'semantic-ui-react'

const Footer = () => (
  <Container>
    <Divider className='footer-divider' />
    <Grid className='footer' columns={1}>
      <Grid.Column textAlign='center'>
        <Image src={logo} size='tiny' alt='Small Business Administration' centered />
        U.S. Small Business Administration | 409 3rd St, SW. Washington DC 20416
      </Grid.Column>
    </Grid>
  </Container>
)

export default Footer