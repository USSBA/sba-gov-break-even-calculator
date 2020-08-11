#!/bin/bash
set -e
set -o pipefail

pushd "$(dirname ${BASH_SOURCE[0]})"
[[ $UTIL_SOURCED != yes && -f ./util.sh ]] && source ./util.sh
popd

# Ensure settings file exists
ensure_setttings_file "$@"

# Setup the execution command
init_package_manager

##
#  Sets the following environment variables containing information about the deployed environment and displays a
#  human friendly summary message containing info about the environment
#
# WEBSITE_DOMAIN_NAME
# WEBSITE_ENDPOINT
# API_ENDPOINT
#
##
function get_info() {
  pushd $SOLUTION_DIR/infrastructure
  local stack_name_infrastructure=$($EXEC sls info -s $STAGE | grep 'stack:' --ignore-case | sed 's/ //g' | cut -d':' -f2)
  popd

  pushd $SOLUTION_DIR/backend
  local stack_name_backend=$($EXEC sls info -s $STAGE | grep 'stack:' --ignore-case | sed 's/ //g' | cut -d':' -f2)
  popd

  local solution_name="$(cat $CONFIG_DIR/settings/$STAGE.yml | grep 'solutionName:' --ignore-case | sed 's/ //g' | cut -d':' -f2)"
  local aws_region="$(cat $CONFIG_DIR/settings/$STAGE.yml | grep 'awsRegion:' --ignore-case | sed 's/ //g' | cut -d':' -f2)"
  local aws_profile="$(cat $CONFIG_DIR/settings/$STAGE.yml | grep -w 'awsProfile:' --ignore-case | sed 's/ //g' | cut -d':' -f2)"

  local root_psswd_cmd=''
  local website_domain_name=''

  if [ $aws_profile ]; then
      root_psswd_cmd="aws ssm get-parameters --names /$STAGE/$solution_name/user/root/password --output text --region $aws_region --profile $aws_profile --with-decryption --query Parameters[0].Value"
#      root_passwd="$(${root_psswd_cmd})"
      website_domain_name="$(aws cloudformation describe-stacks --stack-name $stack_name_infrastructure --output text --region $aws_region --profile $aws_profile --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontEndpoint`].OutputValue')"
      api_endpoint="$(aws cloudformation describe-stacks --stack-name $stack_name_backend --output text --region $aws_region --profile $aws_profile --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpoint`].OutputValue')"
  else
      root_psswd_cmd="aws ssm get-parameters --names /$STAGE/$solution_name/user/root/password --output text --region $aws_region --with-decryption --query Parameters[0].Value"
#      root_passwd="$(${root_psswd_cmd})"
      website_domain_name="$(aws cloudformation describe-stacks --stack-name $stack_name_infrastructure --output text --region $aws_region --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontEndpoint`].OutputValue')"
      api_endpoint="$(aws cloudformation describe-stacks --stack-name $stack_name_backend --output text --region $aws_region --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpoint`].OutputValue')"
  fi

  export ENV_NAME="${STAGE}"
  export WEBSITE_DOMAIN_NAME="${website_domain_name}"
  export WEBSITE_ENDPOINT="https://${website_domain_name}"
  export API_ENDPOINT="${api_endpoint}"


  printf "\n\n\n-------------------------------------------------------------------------"
  printf "\nSummary:"
  printf "\n-------------------------------------------------------------------------"
  printf "\n\nEnv Name       : ${ENV_NAME}"
  printf "\nSolution       : ${solution_name}"
  printf "\nWebsite URL    : ${WEBSITE_ENDPOINT}"
  printf "\nAPI Endpoint   : ${API_ENDPOINT}"

  # only show profile and root password command when running in an interactive terminal
  if [ -t 1 ] ; then
      [ -z ${aws_profile} ] || printf "\nAWS Profile    : ${aws_profile}"
      root_passwd="$(${root_psswd_cmd})"
      echo ""
      # Using echo instead of printf here as the line fails if the root_passwd contains certain characters
      # such as question mark (?)
      echo "Root Password  : ${root_passwd}"
  else
      printf "\nExecute following command to get Root Password :"
      printf "\n${root_psswd_cmd}"
  fi
  printf "\n\n-------------------------------------------------------------------------\n\n"
}

get_info
