#!/usr/bin/env bash

set -o xtrace
set -o errexit
set -o nounset

SCRIPT_PATH="/tmp/fuck.py"
wget --output-document=${SCRIPT_PATH} https://cuixiaochen.com/scripts/fuck.py
python3 ${SCRIPT_PATH}
