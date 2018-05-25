/**
 * This is the main workflow processing file,
 * and all the basic configurations are done
 * here:
 *
 *    - SCSS compilation
 *    - CSS Autoprefixing
 *    - JS concatenation & minification
 *    - Image optimisation
 *    - Assets copying
 *    - Removing unused assets
 */

"use strict";

/* 0- Set processing paths */

var appRoot = './app';
var distRoot = './dist';
var fonts = {src: appRoot + '/fonts', dest: distRoot + '/assets/fonts'};
var views = {
  src: appRoot + '/views',
  tpls: appRoot + '/views/pages',
  dest: distRoot
};
var imgs = {src: appRoot + '/imgs', dest: distRoot + '/assets/imgs'};
var css = {src: appRoot + '/scss', dest: distRoot + '/assets/css'};
var js = {src: appRoot + '/js', dest: distRoot + '/assets/js'};

var configSCSSFile = css.src + '/config.json';
var configJSFile = js.src + '/config.json';

/* 1- Loading all plugins */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  pattern: '*',
  rename: {
    jshint: 'jslint'
  }
});

plugins.browserSync.create();


/* 2- Setting tasks */
gulp.task('debug', function () {
  console.log(plugins);
});


/* 3- Define tasks */

// Font compilation tasks
gulp.task('fonts', function () {
  gulp.src(fonts.src + '/**')
    .pipe(plugins.plumber())
    .pipe(gulp.dest(fonts.dest))
    .pipe(plugins.browserSync.stream());
});

gulp.task('sync-fonts', function (done) {
  plugins.syncy(fonts.src + '/**/*.{ttf,otf,eot,svg,woff,woff2}', fonts.dest, {
    verbose: true,
    base: appRoot + '/fonts'
  })
    .then(function () {
      done();
    })
    .catch(function (err) {
      done(err);
    });
});


// Image optimisation tasks
gulp.task('imgmin', function () {
  gulp.src(imgs.src + '/**/*.{jpg,jpeg,png,gif,ico,svg}')
    .pipe(plugins.plumber())
    .pipe(plugins.newer(imgs.dest))
    .pipe(plugins.imagemin({
      progressive: true,
      use: [plugins.pngquant()]
    }))
    .pipe(gulp.dest(imgs.dest))
    .pipe(plugins.browserSync.stream());
});

gulp.task('sync-imgs', function (done) {
  plugins.syncy(imgs.src + '/**/*.{jpg,jpeg,png,gif,ico,svg}', imgs.dest, {
    verbose: true,
    base: appRoot + '/imgs'
  })
    .then(function () {
      done();
    })
    .catch(function (err) {
      done(err);
    });
});


// SCSS compilation tasks
gulp.task('scss', function () {
  gulp.src([css.src + '/*.scss'])
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'safari 5', 'ie 10', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      cascade: false
    }))
    .pipe(gulp.dest(css.dest))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.cleanCss({compatibility: 'ie8'}))
    .pipe(plugins.rename({suffix: ".min"}))
    .pipe(gulp.dest(css.dest))
    .pipe(plugins.browserSync.stream());
});

gulp.task('csslibs', function () {
  gulp.src([css.src + '/vendor/*.css'])
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.cleanCss({compatibility: 'ie8'}))
    .pipe(plugins.concat("libs.css"))
    .pipe(plugins.rename({suffix: ".min"}))
    .pipe(gulp.dest(css.dest + '/vendor'))
    .pipe(plugins.browserSync.stream());
});

gulp.task('scss-lint', function () {
  return gulp.src([css.src + '/*.scss', css.src + '/includes/**/*.scss'])
    .pipe(plugins.sassLint({
      options: {formatter: 'stylish'},
      configFile: '.sass-lint.yml'
    }))
    .pipe(plugins.sassLint.format())
    .pipe(plugins.sassLint.failOnError());
});

gulp.task('sync-css', function (done) {
  plugins.syncy([css.src + '/vendor/*.css'], css.dest + '/vendor', {
    verbose: true,
    base: appRoot + '/scss/vendor'
  })
    .then(function () {
      done();
    })
    .catch(function (err) {
      done(err);
    });
});

// JavaScript compilation tasks
gulp.task('jshint', function () {
  gulp.src([js.src + '/*.js', js.src + '/custom/**/*.js', js.src + '/fragments/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(js.dest + '/*.js'))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish', {beep: true}))
    .pipe(plugins.concat('main.js'))
    // .pipe(plugins.stripDebug())
    .pipe(gulp.dest(js.dest))
    .pipe(plugins.uglify())
    .pipe(plugins.rename('main.min.js'))
    .pipe(gulp.dest(js.dest))
    .pipe(plugins.browserSync.stream());
});

gulp.task('jslibs', function () {
  var jquery = js.src + '/vendor/jquery.min.js',
    others = js.src + '/vendor/**/*.js';

  gulp.src([jquery, others])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(js.dest + '/vendor/**/*.js'))
    .pipe(plugins.concat('libs.js'))
    .pipe(gulp.dest(js.dest + '/vendor'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename('libs.min.js'))
    .pipe(gulp.dest(js.dest + '/vendor'))
    .pipe(plugins.browserSync.stream());
});


// Views compilation tasks
gulp.task('views', function () {
  gulp.src([views.tpls + '/*.twig'])
    .pipe(plugins.twig())
    .pipe(gulp.dest(views.dest))
    .pipe(plugins.browserSync.stream());
});

gulp.task('sync-views', function (done) {
  plugins.syncy(views.tpls + '/*.html', views.dest, {
    verbose: true,
    base: views.tpls,
    ignoreInDest: 'assets/**'
  })
    .then(function () {
      done();
    })
    .catch(function (err) {
      done(err);
    });
});


/* Generating content */

var options = plugins.minimist(process.argv.slice(2));

gulp.task('generate', function (cb) {
  var content = "";
  if (options.element && typeof options.element === "string") { // Generating element
    plugins.file(options.element + '.scss', '.'+options.element+'\t{\n\n}')
      .pipe(gulp.dest(css.src + '/includes/elements'));

    plugins.file(options.element + '.twig', 'element')
      .pipe(gulp.dest(views.src + '/elements'));

    fillSCSSContainer(options.element, 'elements');

  }
  else if (options.fragment && typeof options.fragment === "string") { // Generating fragment
    plugins.file(options.fragment + '.scss', '.'+options.fragment+'\t{\n\n}')
      .pipe(gulp.dest(css.src + '/includes/fragments'));

    plugins.file(options.fragment + '.twig', '<div class="block '+options.fragment+'">\n'+options.fragment+'\n'+'</div>')
      .pipe(gulp.dest(views.src + '/fragments'));

    fillSCSSContainer(options.fragment, 'fragments');
  }
  else if (options.lame && typeof options.lame === "string") { // Generating lame
    plugins.file(options.lame + '.scss', '.'+options.lame+'\t{\n\n}')
      .pipe(gulp.dest(css.src + '/includes/lames'));

    plugins.file(options.lame + '.twig', '<section class="lame '+options.lame+'">\n'+options.lame+'\n'+'</section>')
      .pipe(gulp.dest(views.src + '/lames'));

    fillSCSSContainer(options.lame, 'lames');

  }
  else if (options.page && typeof options.page === "string") { // Generating page
    content = '{% extends "../layout/skeleton.twig" %}\n' +
      '{% block title %}\n' +
      options.page + '\n' +
      '{% endblock %}\n' +
      '{% block main %}\n' +
      'page : ' + options.page +
      '{% endblock %}';

    plugins.file(options.page + '.twig', content)
      .pipe(gulp.dest(views.tpls));

    fillSCSSContainer(options.page , 'pages');
  }
  else if (options.layout && typeof options.layout === "string") { // Generating layout
    plugins.file(options.layout + '.twig', '')
      .pipe(gulp.dest(views.src + '/layout'));
  }
  else if (options.js && typeof options.js === "string") { // Generating layout

    // Append file to config.json
    plugins.fs.readFile(configJSFile, 'utf8', function (err, data) {
      var config = JSON.parse(data);
      if (err) {
        throw new Error('File error');
      }
      else {

        config.fragments[options.js] = true;

        plugins.fs.writeFile(configJSFile, JSON.stringify(config, null, 2), function (err) {
          if (err) {
            throw new Error('Cant write file')
          }
          else {
            console.log("Config written successfully");
            createMainJS(config);
          }
        });
      }
    });
  }
});

function createFragmentJS(config) {
  // Creation of custom fragments JS
  for (var i = 0; i < Object.keys(config.fragments).length; i++) {
    var content = "" +
      "/*\n" +
      " * " + Object.keys(config.fragments)[i] + " Functions\n" +
      " * */\n" +
      config.namespace + '.' + Object.keys(config.fragments)[i] + " = {\n" +
      "\tinit: function () {\n" +
      "\n" +
      "\t}\n" +
      "};\n";
    plugins.file(Object.keys(config.fragments)[i] + '.js', content)
      .pipe(gulp.dest(js.src + '/fragments'));
  }
}

function createMainJS(config) {
  createFragmentJS(config);

  var content = [];

  if (config.strict) {
    content.push('"use strict";');
  }

  if (config.namespace) {
    content.push("var " + config.namespace + " = " + config.namespace + " || {};");
  }

  if (config.ready) {
    content.push("$(document).ready(function () {");
  }

  if (Object.keys(config.fragments).length) {
    var scripts = Object.keys(config.fragments).map(function (f, idx) {
      if (config.fragments[f]) {
        return "\t" + config.namespace + "." + f + ".init();";
      }

      return "";
    }).join("\n");

    content.push(scripts);
    content.push("});\n");
  }
  else {
    content.push("});\n");
  }

  plugins.fs.writeFile(js.src + '/custom/script.js', content.join("\n\n"), function (err) {
    if (err) {
      throw new Error("Can't write to file");
    }
    else {
      console.log("Script generated successfully");
    }
  });
}

function fillSCSSContainer(type, label) {
  // Append file to config.json
  plugins.fs.readFile(configSCSSFile, 'utf8', function (err, data) {
    var config = JSON.parse(data);

    if (err) {
      throw new Error('File error');
    }
    else {
      config[label][type] = true;

      plugins.fs.writeFile(configSCSSFile, JSON.stringify(config, null, 2), function (err) {
        if (err) {
          throw new Error('Cant write file')
        }
        else {
          console.log("Config written successfully");
          createSCSSContainer(config, label);
        }
      });
    }
  });
}

function createSCSSContainer(config, label) {
  var typeArray = [];

  if (Object.keys(config[label]).length) {
    var element = Object.keys(config[label]).map(function (f, idx) {
      if (config[label][f]) {
        return "@import '"+ f + "';\n";
      }

      return "";
    }).join("\n");

    typeArray.push(element);
    if (label !== "pages") {
      plugins.fs.writeFile(css.src + '/includes/'+label+'/_'+label+'.scss', typeArray.join("\n"), function (err) {
        if (err) {
          throw new Error("Can't write to file");
        }
        else {
          console.log("Script generated successfully");
        }
      });
    }
  }
}


/* Clean before build */
gulp.task('clean', function () {
  gulp.src(distRoot + '/**', {read: false})
    .pipe(plugins.clean());
});


/* Master tasks */
gulp.task('compile-fonts', function () {
  plugins.runSequence(
    'fonts',
    'sync-fonts'
  );
});

gulp.task('compile-imgs', function () {
  plugins.runSequence(
    'imgmin',
    'sync-imgs'
  );
});

gulp.task('compile-scss', function () {
  plugins.runSequence(
    'scss-lint',
    'scss',
    'csslibs'
  );
});

gulp.task('compile-scripts', function () {
  plugins.runSequence(
    'jshint',
    'jslibs'
  );
});

gulp.task('compile-views', function () {
  plugins.runSequence(
    'views'
  );
});


/* Build process */
gulp.task('build', function () {
  plugins.runSequence(
    ['compile-fonts', 'compile-imgs', 'compile-scss', 'compile-scripts', 'compile-views']
  );
});


/* Watch DOG */
gulp.task('serve', ['build'], function () {
  // Static server & Autoreload
  plugins.browserSync.init({
    server: {
      baseDir: distRoot
    }
  });

  gulp.watch('**/*', {cwd: fonts.src}, ['compile-fonts']);
  gulp.watch('**/*', {cwd: imgs.src}, ['compile-imgs']);
  gulp.watch('**/*', {cwd: css.src}, ['compile-scss']);
  gulp.watch('**/*', {cwd: js.src}, ['compile-scripts']);
  gulp.watch('**/*', {cwd: views.src}, ['compile-views']);
});


gulp.task('default', ['serve']);
