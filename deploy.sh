#!/bin/sh
git checkout main && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
npm run build:ingress  && \
npm run build:showcase  && \
npm run build:admin  && \
mv dist/ingress/browser/en _dist && \
mv dist/ingress/browser/he _dist && \
mv dist/showcase/browser/en _dist/show && \
mv dist/showcase/browser/he _dist/show && \
mkdir _dist/show/en/jma25 && cp -r _dist/show/he/index.html _dist/show/en/jma25 && \
mkdir _dist/show/he/pps25 && cp -r _dist/show/he/index.html _dist/show/he/pps25 && \
mkdir _dist/show/he/pps25w && cp -r _dist/show/he/index.html _dist/show/he/pps25w && \
mv dist/admin/browser _dist/admin && \
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
