#!/bin/bash
echo "Updating code"
git pull
rm -rf build antrika-portal-build.zip
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
    rm -rf /opt/antrika-portal-build/*
    echo "Removed old build"
    echo "Coping new build in dist folder"    
    cp -R build/ /opt/antrika-portal-build/
    zip -r antrika-portal-build.zip build/
    cp antrika-portal-build.zip /Users/actolap/Data/Dropbox/
else
    echo "----------------Build Failed----------------"
fi