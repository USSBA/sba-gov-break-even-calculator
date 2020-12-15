const React = require("react")
const gatsby = jest.requireActual("gatsby")
module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: jest.fn().mockImplementationOnce(({ render }) =>
  render({
    site: {
      siteMetadata: {
        title: `Default Starter`,
      },
    },
  })
),
useStaticQuery: jest.fn().mockReturnValue({
  site: {
    siteMetadata: {
      title: `BEP Calc`,
      description: `test`,
      author: `SBA`,
      siteUrl: `test`,
    },
  },
})
}