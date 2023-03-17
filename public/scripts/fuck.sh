#!/usr/bin/env bash

set -o xtrace
set -o errexit
set -o nounset

SCRIPT_PATH="/tmp/fuck.py"

# -f, --force: ignore nonexistent files and arguments, never prompt
rm --force ${SCRIPT_PATH}

# -O file
# --output-document=file
#   The documents will not be written to the appropriate files, but all will be concatenated together and written to file.
wget --output-document=${SCRIPT_PATH} https://cuixiaochen.com/scripts/fuck.py

python3 ${SCRIPT_PATH}
