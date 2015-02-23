# Starter files for MP2
Use the following commands in your vagrant development environment to get this up and running
```bash
git clone https://github.com/uiuc-web-programming/mp2_starter.git
cd mp2_starter
npm install
bower install
grunt compass
grunt uglify
grunt
```

For MP1, you should edit the following:
- `public/index.html` - all files in the `public` folder will be served by the server
- `sass` folder - all sass files here will be compiled to `public/css/styles.css`
- `js` folder - all javascript files here will be uglified and put in `public/js/script.js`
- `public/lib/foundation/scss` - all scss files here will be compiled and put in `public/lib/foundation/css/foundation.css`
