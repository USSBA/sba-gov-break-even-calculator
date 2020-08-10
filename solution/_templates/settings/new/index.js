// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

module.exports = {
  prompt: async ({ prompter, args }) => {
    const sequentiallyPrompt = async prompts => {
      let promptResults = {};
      // sequentially prompt for settings
      for (let i = 0; i < prompts.length; ++i) {
        promptResults = { ...promptResults, ...(await prompter.prompt(prompts[i])) };
      }
      return promptResults;
    };

    const topLevelGeneralSettings = [
      {
        type: 'input',
        name: 'username',
        message: `envName:
        Environment Name
        ------------------------------------------    
        The name of the environment where you want to deploy the solution to. (e.g. dev, preprod, prod, developer1, developer2 etc.). 
        
        Type environment name - `,
      },
      {
        type: 'select',
        name: 'envType',
        message: `envType:
        Environment Type
        ------------------------------------------    
        The environment type (e.g. dev, demo, production). This is for grouping multiple environments into types.
        For example, all developers' environments can be of type "dev".
        This can be use for enabling some envType driven conditionals in code. (For example, create only single node
        ElasticSearch cluster when envType is 'dev' but create multi-node cluster when it's 'prod') 
        
        Select environment type - `,
        initial: 'dev',
        choices: ['dev', 'demo', 'staging', 'production']
      },
      {
        type: 'input',
        name: 'awsProfile',
        message: `awsProfile:
        AWS profile name
        ------------------------------------------ 
        Name of the AWS CLI profile to use. If you need help setting up AWS CLI profile then see https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html first.
        
        Type AWS profile name - `,
        initial: 'lower',
      },
      {
        type: 'input',
        name: 'awsRegion',
        message: `awsRegion:
        AWS region name
        ------------------------------------------ 
        Name of the AWS Region you want to deploy to.
        
        Type AWS region name - `,
        initial: 'us-east-1',
      },
      {
        type: 'input',
        name: 'solutionName',
        message: `solutionName:
        Solution name
        ------------------------------------------ 
        Name of the solution. The solution name is used for naming various AWS resources.
        Make it short with only lowercase letters, no spaces, no underscores, no dashes and no other special characters (e.g., 'ee').
        
        Type solution name - `,
        initial: 'sra',
      },
      {
        type: 'input',
        name: 'websiteDomain',
        message: `websiteDomain:
        Website Domain
        ------------------------------------------ 
        The URL where the website will ultimately be deployed.  You must manually configure the Route 53 Cname at this time,`,
        initial: '${opt:stage}-${self:custom.settings.solutionName}.qa.ussba.io',
      },
      {
        type: 'input',
        name: 'websiteACMArn',
        message: `websiteACMArn:
        WebsiteACMArn
        ------------------------------------------ 
        the ARN of the website certificate.  Default value is for *.qa.ussba.io`,

        initial: 'afb9de1f-94d3-4023-9b65-381616e4f83e'
      },
    ];
    let allPromptResults = await sequentiallyPrompt(topLevelGeneralSettings);
    const idpFederationSettings = [
      {
        type: 'input',
        name: 'fedIdpIds',
        message: `fedIdpIds:
        Federation Identity Provider IDs
        ------------------------------------------ 
        The usual practice is to keep this same as the domain name of the idp. 
        For example, when connecting with an IdP that has users "user1@domain1.com", "user2@domain1.com" etc then the id should be set to "domain1.com"
    
        See sample identity federation settings in "post-deployment/config/settings/demo.yml".
        
        Type id of the identity provider (please wrap in double quotes e.g., "ee.gov" instead of ee.gov) - `,
        initial: '"ee.gov"',
        ifSkipped: '', // ifSkipped is custom field here not part of the hygen
      },

      {
        type: 'input',
        name: 'fedIdpNames',
        message: `fedIdpNames:
        Federation Identity Provider Names
        ------------------------------------------ 
        Name of the identity provider to connect to.  
        
        See sample identity federation settings in "post-deployment/config/settings/demo.yml". 
        
        Type name of the identity provider (please wrap in double quotes) - `,
        initial: '"EEAD"',
        ifSkipped: '', // ifSkipped is custom field here not part of the hygen
      },

      {
        type: 'input',
        name: 'fedIdpDisplayNames',
        message: `fedIdpDisplayNames:
        Federation Identity Provider Display Names
        ------------------------------------------ 
        Display name of the identity provider to connect to. 
        
        See sample identity federation settings in "post-deployment/config/settings/demo.yml".
        
        Type display name of the identity provider (please wrap in double quotes) - `,
        initial: '"AD Login"',
        ifSkipped: '', // ifSkipped is custom field here not part of the hygen
      },

      {
        type: 'input',
        name: 'fedIdpMetadatas',
        message: `fedIdpMetadatas:
        Federation Identity Provider SAML Metadata:
        ------------------------------------------ 
        SAML metadata of the identity provider to connect to. 
        
        See sample identity federation settings in "post-deployment/config/settings/demo.yml".
          
        The should be either
        1. S3 or http(s) url pointing to the IdP metadata.
        2. the metadata content XML blob as string
        
        Type identity provider SAML metadata for the identity provider (please wrap in double quotes) - `,
        initial: '"s3://${self:custom.settings.namespace}-artifacts/saml-metadata/metadata.xml"',
        ifSkipped: '', // ifSkipped is custom field here not part of the hygen
      },
    ];
    if (allPromptResults.idFederation) {
      allPromptResults = {
        ...allPromptResults,
        ...(await sequentiallyPrompt(idpFederationSettings)),
      };
    }

    const setDefaultIfNotSpecified = () => {
      const skippableSettings = [...idpFederationSettings];
      skippableSettings.forEach(({ name, ifSkipped }) => {
        allPromptResults[name] = allPromptResults[name] || ifSkipped;
      });
    };
    // the "initial" value may not be set for prompts that may have been skipped
    // (for example if user answers "No" to "Configure Identity Federation Now?" then all prompts for
    // idpFederationSettings would have been skipped and we need to set the "ifSkipped" values for those prompts
    // as defaults in the result)
    setDefaultIfNotSpecified();

    return allPromptResults;
  },
};
