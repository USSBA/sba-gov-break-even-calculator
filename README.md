<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->


# Install Break Even Calculator

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
    cd sba-gov-break-even-calculator/solutions/ui
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    Open the `sba-gov-break-even-calculator` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

# Easy Mode to log in to AWS with MFA:

All instructions assume you use an MFA token and have credentials set appropriately as described above.
Install the [AWS CLI Helpers](https://github.com/USSBA/sba-aws-helpers) per the instructions to make your life easier.

```bash
$ export AWS_PROFILE=default
$ aws-iam-start-mfa-session 
$ unset AWS_PROFILE
```

# Install dependencies
```bash
$ brew install pnpm
$ pnpm install
$ sudo pnpm i -g hygen
```

# Generate a settings file

```bash
$ cd solution
$ hygen settings new
```
Each input has instructions on how it will be used. Make sure to name it your github username.  These values can be changed at a later date.

when complete 2 files will be created.  Environment and stage will be used interchangably going forward.

# Deploy the infrastructure

```bash
$ scripts/environment-deploy.sh <stage>
```
or 

```bash
$ scripts/environment-deploy.sh <stage>
```

Where <stage> is the name you gave your environment in hygen settings

This will create and deploy all of the necessary infrastructure and code for the specified stage

a Website URL will be part of the final output.  You can visit your deployed code there.

# Deploy new front end code

After you have made some changes to your front end app you may want to redeploy it. To do so you have to first
run gatsby build. 

```bash
$ solution/ui/gatsby build 
```

To deploy the app you can do 1 of the following:

```bash
solution/ui $ sls publish-ui --stage <stage>
```

or, the slightly more verbose version:

```bash
solution/ui $ sls package-ui --stage <stage>
solution/ui $ sls deploy-ui --stage <stage>
```

When finished you should see new code deployed at your Website URL value. 
 
 If you have forgotten your Website URL you can always run the following command to get the values

```bash
$ scripts/get-info.ssh <stage>
```

# Delete your environment

Once your environment has served its purpose it can be easily destroyed by running

```bash
$ scripts/environment-delete.sh <stage>
```

# Summary

In this repository you are able to create a serverless environment for a single page web app (React in this case, 
but could be anything), deploy code to it, and, when finished, delete the infrastructure.  All commands should be 
idempotent so running them extra times will not cause problems.  Going forward, this repo can be expanded to include a 
backend api either by default, or as a hygen template, similar to how the settings file was created.  Any existing react 
type project could even be brought into this paradigm by replacing src and package.json in the solution/ui folder.  In 
addition, additional tooling, such as cypress, storybook, an sba master stylesheet, or semantic ui could be added by 
default or with a hygen script based on the developer's choices.
