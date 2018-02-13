#!/bin/sh

npm run-script build
rm -rf ../vam-server/public
mv build ../vam-server/public


