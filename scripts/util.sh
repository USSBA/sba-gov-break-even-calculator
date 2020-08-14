#!/usr/bin/env bash
set -e

UTIL_SOURCED=yes

# https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"

pushd "${DIR}/.."
export SOLUTION_ROOT_DIR="${PWD}"
export SOLUTION_DIR="${SOLUTION_ROOT_DIR}/solution"
export CONFIG_DIR="${SOLUTION_ROOT_DIR}/config"
export INT_TEST_DIR="${SOLUTION_ROOT_DIR}/integration-tests"
popd

function init_package_manager() {

  PACKAGE_MANAGER=pnpm
  case "$PACKAGE_MANAGER" in
    yarn)
      EXEC="yarn run"
      RUN_SCRIPT="yarn run"
      INSTALL_RECURSIVE="yarn workspaces run install --ignore-scripts"
      ;;
    npm)
      EXEC="npx"
      RUN_SCRIPT="npm run"
      INSTALL_RECURSIVE=
      ;;
    pnpm)
      EXEC="pnpx"
      RUN_SCRIPT="pnpm run"
#      INSTALL_RECURSIVE="pnpm recursive install --ignore-scripts"
      INSTALL_RECURSIVE="pnpm recursive install"
      ;;
    *)
      echo "error: Unknown package manager: '${PACKAGE_MANAGER}''" >&2
      exit 1
      ;;
  esac
}

function install_dependencies() {
  init_package_manager

  # Install
  pushd $SOLUTION_DIR
  [[ -n "$INSTALL_RECURSIVE" ]] && $INSTALL_RECURSIVE
  popd
}

function ensure_setttings_file() {
  # Accept 1st argument. Default: username
  STAGE=${1:-$USER}

  echo "Checking settings file for STAGE $STAGE"

  ENVIRONMENT_CONFIG=$CONFIG_DIR/settings/$STAGE.yml

  echo "Ensuring that the settings file $ENVIRONMENT_CONFIG exists"

  if ! test -f "$ENVIRONMENT_CONFIG"
  then
      printf "\nEnvironment configuration does not exist!"
      printf "\nPlease either create the environment configuration using \"init-settings.sh\" or make sure you typed the environment name correctly!\n\n"
      printf "Exiting ...\n\n"
      exit
  fi
}
