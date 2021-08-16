#!/bin/bash

set -e

TARGET_DIR='gh-pages'
TARGET_BRANCH='master'
TARGET_REPO_URL="https://$GH_AUTH_TOKEN@github.com/chartjs/chartjs.github.io.git"

# Clone the repository and checkout the gh-pages branch
git clone $TARGET_REPO_URL $TARGET_DIR
cd $TARGET_DIR
git checkout $TARGET_BRANCH

# Copy generated website
cp -r ../www/* ./

git add -A

git remote add auth-origin $TARGET_REPO_URL
git config --global user.email "$GH_AUTH_EMAIL"
git config --global user.name "Chart.js"
git commit -m "Deploy website from $GITHUB_REPOSITORY" -m "Commit: $GITHUB_SHA"
git push -q auth-origin $TARGET_BRANCH
git remote rm auth-origin

# Cleanup
cd ..
rm -rf $TARGET_DIR
