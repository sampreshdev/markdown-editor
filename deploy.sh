#!/bin/bash
BRANCH=${1:-dev-master}
cd /opt/codebase/antrika-customer-portal
echo "Updating code"
git pull
git checkout ${BRANCH}
sleep 2
echo "Checked out ${BRANCH}"
git pull
echo "Other Project Clean Install ..."
sh chat-ai-admin-fe/deploy.sh
echo "Clean Install ..."
npm i --legacy-peer-deps
echo "Eslint check ..."
npx eslint --ext .js --ext .jsx  --ext .ts --ext .tsx ./src ./test
echo "Building ..."
sleep 2
# npm run build
export ASSET_PATH=$2 && npm run build
sleep 2
if [ -d build ]
then
    echo "----------------Build success----------------"
    echo "Removing old build"
    rm -rf dist
    echo "Removed old build"
    echo "Coping new build in dist folder"
    cp -R build dist
    rm -rf dist.zip
    zip -r dist.zip dist/
else
    echo "----------------Build Failed----------------"
fi