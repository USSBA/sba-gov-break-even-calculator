import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/hero/hero'
import { Grid } from 'semantic-ui-react'

const IndexPage = () => (
  <Layout>
    <SEO title='Break Even Calculator' />
    <Grid columns={1}>
      <Grid.Column>
        <Hero>
          Placeholder content
        </Hero>
      </Grid.Column>
    </Grid>
  </Layout>
)

export default IndexPage
