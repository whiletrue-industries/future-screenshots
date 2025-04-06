#!/bin/sh
git checkout main && \
(git branch -D dist || true) && \
git checkout -b dist && \
rm .gitignore && \
npm run build ingress --base-href=ingress/ && \
(cp CNAME-INGRESS dist/ingress/browser/CNAME || true) && \
git add dist/ingress && \
git commit -m dist && \
(git branch -D gh-pages || true) && \
git subtree split --prefix dist/ingress/browser -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout main && \
git branch -D gh-pages && \
git branch -D dist && \
git checkout . && \
git push
