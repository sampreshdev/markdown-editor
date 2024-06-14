#!/bin/bash
git checkout development
echo "Updating code"
echo "${tag}"
git pull
rm -rf build build.zip
echo "Chat AI Project Clean Install ..."
sh chat-ai-admin-fe/deploy.sh
echo "Chat AI Clean Install ..."
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
    rm -rf /opt/build/*
    #rm -rf dist
    echo "Removed old build"
    echo "Coping new build in dist folder"
    #cp -R build dist
    #rm -rf dist.zip
    cp -R img/* build/img/
    cp -R build/ /opt/build/
    zip -r build.zip build/
    cp build.zip /Users/actolap/Data/Dropbox/    
else
    echo "----------------Build Failed----------------"
fi