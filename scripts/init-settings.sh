#!/bin/bash
set -e

cd "$(dirname ${BASH_SOURCE[0]})/.."
SOLUTION_DIR=$PWD/solution

printf "\nWe'll need a bit of information to create your new environment.\n\n"

cd $SOLUTION_DIR
npx hygen settings new