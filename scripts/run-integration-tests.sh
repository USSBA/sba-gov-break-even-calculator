#!/bin/bash
set -e

printf "\n\nInitializing env variables required for running integration test against env "$@"\n"
source ./scripts/get-info.sh "$@"

printf "\n\nExecuting integration tests against env "$@"\n"
pnpm run intTest --recursive --if-present