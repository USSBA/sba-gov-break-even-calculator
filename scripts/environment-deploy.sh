#!/bin/bash
set -e

pushd "$(dirname ${BASH_SOURCE[0]})"
[[ $UTIL_SOURCED != yes && -f ./util.sh ]] && source ./util.sh
popd

# Ensure settings file exists
ensure_setttings_file "$@"

# Install
install_dependencies "$@"

function componentDeploy {
    COMPONENT_DIR=$1
    COMPONENT_NAME=$2

    printf "\nDeploying component: $COMPONENT_NAME ...\n\n"
    pushd $SOLUTION_DIR/$COMPONENT_DIR
    $EXEC sls deploy -s $STAGE

    # Disable serverless stats
    $EXEC sls slstats --disable -s $STAGE
    printf "\nDeployed component: $COMPONENT_NAME successfully \n\n"
    popd
}

componentDeploy "infrastructure" "Infrastructure"
#componentDeploy "backend" "Backend"
#componentDeploy "edge-lambda" "Edge-Lambda"
#componentDeploy "post-deployment" "Post-Deployment"

# We now need to invoke the post deployment lambda (we can do this locally)
#$EXEC sls invoke local -f postDeployment --env WEBPACK_ON=true -s $STAGE
#printf "\nInvoking post-deployment steps\n\n"
#pushd $SOLUTION_DIR/post-deployment
#$EXEC sls invoke -f postDeployment -s $STAGE
#popd

# Deploy UI
pushd $SOLUTION_DIR/ui
# first we package locally (to populate .env.local only)
printf "\nPackaging website UI\n\n"
$EXEC sls package-ui --local=true -s $STAGE
# then we package for deployment
# (to populate .env.production and create a build via "npm build")
$EXEC sls package-ui -s $STAGE

printf "\nDeploying website UI\n\n"
# Deploy it to S3, invalidate CloudFront cache
$EXEC sls deploy-ui --invalidate-cache=true -s $STAGE
printf "\nDeployed website UI successfully\n\n"
popd

printf "\n----- ENVIRONMENT DEPLOYED SUCCESSFULLY 🎉 -----\n\n"
pushd "$(dirname ${BASH_SOURCE[0]})"

# shellcheck disable=SC1091
./get-info.sh "$@"

popd
