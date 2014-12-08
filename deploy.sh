git checkout gh-pages
gulp build
/bin/cp -fr dist/images .
/bin/cp -fr dist/scripts .
/bin/cp -fr dist/styles .
/bin/cp -fr dist/templates .
/bin/cp -fr dist/data .
/bin/cp -fr index.html .
git merge master
git add .
git commit -m 'deploy'
git pull
git push
git checkout master
