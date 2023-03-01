#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'update'

# 選擇部署到main還是分支
# if you are deploying to https://github.com/RitaHuang9/Vue-HW06.git
# git push -f https://github.com/RitaHuang9/Vue-HW06.git main

# if you are deploying to https://github.com/RitaHuang9/Vue-HW06.git 
git push -f https://github.com/RitaHuang9/Vue-HW06.git main:gh-pages

cd -