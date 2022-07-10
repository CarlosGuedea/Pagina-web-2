const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//Imagenes
const webp = require("gulp-webp");

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };

  src("img/*.jpeg").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}

function CSS(done) {
  src("scss/**/*.scss").pipe(plumber()).pipe(sass()).pipe(dest(CSS));
  done();
}

function dev(done) {
  watch("scss/**/*.scss", CSS);
  done();
}

exports.versionWebp = versionWebp;
exports.dev = parallel(dev, versionWebp);
