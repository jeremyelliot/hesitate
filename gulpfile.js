const gulp = require('gulp'),
  uglify = require('gulp-uglify-es').default,
  watch = require('gulp-watch'),
  eslint = require('gulp-eslint'),
  eslintOptions = {
    "rules": {
      "camelcase": 1
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    }
  };

gulp.task('js', function() {
  return
  gulp.src('src/*.js')
    .pipe(eslint(eslintOptions))
    .pipe(eslint.format())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js']);

gulp.task('watch', function() {
  return watch('src/*.js', function() {
    gulp.start('default');
  });
});
