#!/bin/sh
# create a jekyll layout for starters
mkdir newWebsite
mkdir newWebsite/_layouts
mkdir newWebsite/_posts
mkdir newWebsite/_includes
mkdir newWebsite/_plugins
#the ignore folder needs to be added
#to the "exclude:" of the _config.yml
mkdir newWebsite/ignore
mkdir newWebsite/assets
mkdir newWebsite/assets/css
mkdir newWebsite/assets/js
mkdir newWebsite/assets/images


#echo "" > newWebsite/assets/css/main.css
#echo "" > newWebsite/assets/js/main.js
echo "markdown: rdiscount\\npygments: true\\nexclude: /ignore" > newWebsite/_config.yml
echo "---\\nlayout: default\\ntitle: Hello World!\\n---"  > newWebsite/index.md
echo "<!DOCTYPE html>\\n<html>\\n<head>\\n\\t<title>{{ page.title }}\\t</title>\\n</head>\\n<body>\\n\\t{{ content }}\\n</body>\\n</html>" > newWebsite/_layouts/default.html