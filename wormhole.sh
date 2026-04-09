
set -e

DIR="alertwebcomponent/node_modules/ace-editor-webcomponent"

if [ -L "${DIR}" ]; then
    unlink "${DIR}"
fi

if [ -d "${DIR}" ]; then
    rm -rf "${DIR}"
fi

mkdir -p "${DIR}"

cp alert-box.js "${DIR}/"

cp alert-box.d.ts "${DIR}/"

cp react.js "${DIR}/"

cp react.d.ts "${DIR}/"

cp package.json "${DIR}/"

ls -la "${DIR}/"






