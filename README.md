northeast4hk
============

Setup:

1. pre-requisite:

node installed
npm install
npm install -g gulp
npm install -g bower

2. run scripts
bower install
gulp build

In case bower copy failed, copy ./bower_componenets to public/lib, then run gulp build again

3. Then start webserver under dist/, e.g. python -m SimpleHTTPServer 80

4. Should enable Gzip 
