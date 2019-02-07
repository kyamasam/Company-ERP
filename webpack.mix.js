const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .js('resources/assets/js/detect.js','public/js')
    .js('resources/assets/js/jquery.core.js','public/js')
    .js('resources/assets/js/pace.js','public/js')
    .js('resources/assets/js/tableExport.js','public/js')
    .js('resources/assets/js/bootstrap-table-export.js','public/js')
    .js('resources/assets/pages/jquery.dashboard_3.js','public/js')
    .js('resources/assets/pages/jquery.bs-table.js','public/js')
    .js('resources/assets/plugins/bootstrap-table/js/bootstrap-table.js','public/js')
    .sass('resources/sass/app.scss', 'public/css');

