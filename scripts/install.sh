#!/bin/bash
set -e
echo 'About to install all dependencies, please hang in there tight'

pushd "$(dirname ${BASH_SOURCE[0]})"
[[ $UTIL_SOURCED != yes && -f ./util.sh ]] && source ./util.sh
popd

# Install
install_dependencies