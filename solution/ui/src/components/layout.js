/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "semantic-ui-less/semantic.less";

import Header from "./molecules/header/header"
import Footer from "./molecules/footer/footer"
import SEO from "./seo"
import favicon from '../images/favicon.png'
import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  return (
    <>
      <Helmet link={[{rel: 'shortcut icon', type: 'image/png', href: `${favicon}`}]} />
      <SEO title='Break Even Calculator' />
      <Header />
      <main>{children}</main>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
