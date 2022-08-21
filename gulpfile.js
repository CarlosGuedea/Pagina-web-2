const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

//Imagenes
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };

  src("img/*.{jpeg,png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  //watch("img/*.{jpeg,png,jpg}", versionWebp);
  done();
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };

  src("img/*.{jpeg,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50,
  };

  src("img/*.{jpeg,png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
  //watch("img/*.{jpeg,png,jpg}", versionAvif);
  done();
}

function javascript(done) {
  src("js/**/**.js").pipe(dest("build/js"));
  done();
}

function CSS(done) {
  src("scss/**/*.scss").pipe(plumber()).pipe(sass()).pipe(dest(CSS));
  done();
}

function dev(done) {
  watch("scss/**/*.scss", CSS);
  watch("js/**/**.js", javascript);
  done();
}

exports.versionWebp = versionWebp;
exports.js = javascript;
exports.versionWebp = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(dev, versionWebp, imagenes, versionAvif, javascript);
