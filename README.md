<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->

<h1 align="center">
  Install Break Even Calculator
</h1>

## 🚀 Quick start

1.  **Make sure you have Xcode installed**
    Install Xcode Command Line Tools:
    Open your Terminal.
    Install Xcode Command line tools by running:
    Copycopy code to clipboard
    xcode-select --install
💡  If that fails, download it directly from [Apple’s site](https://developer.apple.com/download/more/), after signing-in with an Apple developer account.

1. ***install node version 12 ***
```brew install node```

1. run ```npm install```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd sba-gov-break-even-calculator/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    Open the `sba-gov-break-even-calculator` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!


## Storybook

Storybook is a UI tool that allows for mocking of components in isolation.  You can add run storybook with 

    ```npm run storybook```
    
This will run storybook locally, normally on port 6006.

To add new components to the library please use existing examples and reference the [Story Book docs](https://storybook.js.org/docs/basics/introduction/)


## Common Problems

   1. 'JavaScript heap out of memory' when starting the gatsby development server.  To resolve this run the following command to increase the heap size:

   ```export NODE_OPTIONS="--max-old-space-size=8192"```
   
