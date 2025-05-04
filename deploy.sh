#!/bin/sh
git checkout main && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
npm run build:ingress  && \
npm run build:showcase  && \
mv dist/ingress/browser/en _dist && \
mv dist/ingress/browser/he _dist && \
mv dist/showcase/browser _dist/show && \
mkdir _dist/show/pps25 && cp -r _dist/show/index.html _dist/show/pps25 && \
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
