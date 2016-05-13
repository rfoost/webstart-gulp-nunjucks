#### Installation ####
1. Install node.js
2. run 'npm install'
3. run 'gulp'


## gulpfile.js && package.json ##
1. Project dependancies can be found in package.json
2. Gulp behaviors can be modified in gulpfile.js

##Features##
Browser Sync
Sass/Scss
Nunjucks
Uglify
Autoprefixer - *unsure how reliable it is

#### Build Info ####
1. This build supports sass or scss. Declare your file as .sass or .scss and use @import in the -index.sass file in its directory.
2. This build includes bourbon, it offers a ton of optional mixins. The only one currently inserted into the project is its symantic grid system.
    A basic example can be found at src/assets/css/5-pages/_index.sass
    For more information:
    To learn about the grid and other features: https://youtu.be/8ItNE_DX6Cc?t=29m17s
    http://www.sitepoint.com/sass-bourbon-neat-lightweight-semantic-grids/
    