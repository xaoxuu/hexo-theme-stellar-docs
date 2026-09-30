const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-html-minifier-terser');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

// 压缩css文件
const minify_css = () => (
  gulp.src(['./public/**/*.css', '!./public/{lib,lib/**}', '!./public/{libs,libs/**}', '!./public/{media,media/**}'])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public'))
);

// 压缩html文件
const minify_html = () => (
  gulp.src(['./public/**/*.html', '!./public/{lib,lib/**}', '!./public/{libs,libs/**}', '!./public/{media,media/**}'])
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
)

// 压缩js文件
const minify_js = () => (
  gulp.src([
    './public/**/*.js',
    '!./public/**/*.min.js',
    '!./public/js/runtime/**/*.js',
    '!./public/{lib,lib/**}',
    '!./public/{libs,libs/**}',
    '!./public/{media,media/**}'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(terser({
      ecma: 2015,
      ie8: true,
      safari10: true,
      output: { comments: false }
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public'))
)

gulp.task('minify', gulp.parallel(
  minify_html,
  minify_css,
  minify_js
))

gulp.task('default', gulp.series('minify'));
