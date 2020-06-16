/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "semantic-ui-less/semantic.less";

import { Container } from 'semantic-ui-react'
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
