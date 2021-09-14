/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from "react";
const PostBodyComponents = [
  <link rel="stylesheet" href="https://feedback-form.qa.ussba.io/feedbackForm.js/assets/uswds-2.12.0/css/uswds.min.css" />,
  <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.14/webcomponents-hi.js"/>,
  <script rel="import" src='https://feedback-form.qa.ussba.io/FeedbackForm.js' type="text/javascript" />,
];
export const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  setPostBodyComponents(PostBodyComponents);
};
  