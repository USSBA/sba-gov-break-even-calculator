import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Break Even Calculator</h1>
    <p>Welcome to Break Even Calculator.</p>
    <p>Now go build something great.</p>

    <Link to="/page-2/">Go to page 2</Link> <br />
  </Layout>
)

export default IndexPage
