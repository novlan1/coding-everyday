
#!/usr/bin/env sh

set -e
# git push;
# node .bin/changeBase.js /just-react/;

npm run docs:build;

cd dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:novlan1/coding-everyday.git master:gh-pages

cd -

# rm -rf dist

# node .bin/changeBase.js