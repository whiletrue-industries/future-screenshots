#!/bin/sh
git checkout main && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
npm run build:app  && \
mv dist/app/browser/en _dist && \
mv dist/app/browser/he _dist && \
mv dist/app/browser/nl _dist && \
(cp CNAME _dist/ || true) && \
git add _dist && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix _dist -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout main && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . && \
git push
