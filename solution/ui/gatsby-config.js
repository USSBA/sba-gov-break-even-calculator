module.exports = {
  pathPrefix: `/breakevenpointcalculator/calculate`,
  siteMetadata: {
    title: `SBA - Break Even Calculator`,
    description: `This calculator will help you determine the break-even point for your business.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-pnpm`,
    `gatsby-plugin-less`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        display: `minimal-ui`
      },
    },
    'gatsby-plugin-eslint'


    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
