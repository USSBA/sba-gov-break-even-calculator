Guide for using this Terraform:

1.  Have Terraform installed (Windows, Linux, OSX, etc.).  The Terraform HCL syntax in this repo is 0.12+ compliant and has not been tested against earlier versions.  It's fair to assume it probably doesn't work with earlier versions.

2.  Setup your personal AWS credentials in ~/.aws/credentials if you haven't already.  I'm assuming you would already have completed this step but am including it for the sake of completeness.

3.  Login to your SBA AWS account via the CLI; e.g., 

./sba-aws-helpers-master/manage-mfa.sh

The SBA AWS helper scripts are available here if you don't have them already: git@github.com:USSBA/sba-aws-helpers.git 

4.  Presently the s3-bucket.tf and vars.tf files have settings that assume your AWS credential profile name will be "lower" however you can specify a different profile name on the command-line like so: 

terraform apply -var 'profile=upper' 

... in the event you want to apply the configuration to the upper environment (obviously)