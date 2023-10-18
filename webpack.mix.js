const mix = require('laravel-mix');
require('dotenv').config();

// Save proxy as ddev host if available or site url
const proxy_url = process.env.DDEV_HOSTNAME || process.env.PRIMARY_SITE_URL;

// Public path helper
const publicPath = path => `${mix.publicPath}/${path}`;

// Source path helper
const src = path => `src/${path}`;

// Public Path
mix.setPublicPath('web');

// Browsersync with ddev-browsersync installed
// https://browsersync.io/docs/options/ and
// https://github.com/ddev/ddev-browsersync
mix.browserSync({
  // proxy: 'localhost',
  // host: proxy_url,
  // watch: true,
  // open: false,
  // ui: false
  proxy: proxy_url,
  open: false
});

// Browsersync without ddev-browsersync installed:
// mix.browserSync({
//   proxy: proxy_url,
//   open: false
// });

// Styles
mix.sass(src`styles/main.scss`, 'web/build/styles');

// JavaScript
// extract() to separate custom JS from vendor files
mix
  .js(src`scripts/main.js`, 'web/build/scripts')
  .extract();

// Assets
// mix.copy(src`images`,'web/build/images')
mix.copy(src`fonts`,'web/build/fonts')
mix.copy(src`svgs`,'web/build/svgs')

// SVG plugin
let SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
let svgSpriteDestination = publicPath`svgs-defs.svg`;
mix.webpackConfig({
  plugins: [
    new SVGSpritemapPlugin(
      [
        'src/svgs/*.svg',
        'src/svgs/icons/*.svg'
      ], {
      output: {
        filename: 'build/spritemap.svg',
        chunk: {
          keep: true
        },
        svgo: true
      },
      sprite: {
        prefix: false
      }
    })
  ]
});

// Options
// https://laravel.com/docs/8.x/mix#url-processing
mix.options({
  processCssUrls: false,
  ignore: ['.DS_Store']
});

// Only bark on errors
mix.disableSuccessNotifications();

// Source maps when not in production.
mix.sourceMaps(false, 'source-map');

// Hash and version files in production.
mix.version();