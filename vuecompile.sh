#!/bin/sh
cd src/game || exit 1
npm run build || exit 1
cd ../.. || exit 1

npm start || exit 1
