#!/bin/sh
git checkout main && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
npm run build:ingress  && \
npm run build:showcase  && \
mkdir _dist && \
mv dist/ingress/browser _dist/ && \
mv dist/showcase/browser _dist/show && \
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
