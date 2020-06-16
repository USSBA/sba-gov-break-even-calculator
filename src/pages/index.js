import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Grid } from 'semantic-ui-react'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Grid columns={1}>
      <Grid.Column>
        <h1>Break Even Calculator</h1>
        <p>Welcome to Break Even Calculator.</p>
        <p>Now go build something great.</p>
      </Grid.Column>
    </Grid>
  </Layout>
)

export default IndexPage
