import { Link} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../images/sba-logo-horizontal.jpg"
import "semantic-ui-less/semantic.less";
import { Container, Image, Divider } from 'semantic-ui-react'

const Header = ({ siteTitle }) => (
  <header>
    <Container>
      <Image src={logo} alt="Break Even Calculator" />  
      <Divider />
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header