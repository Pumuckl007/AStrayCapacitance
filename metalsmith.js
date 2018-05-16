var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var Runner      = require('metalsmith-start').Runner;

var metalsmith = Metalsmith(__dirname);
  metalsmith.metadata({
    title: "A Stray Capacitance",
    description: "A blog about what I do.",
    generator: "Metalsmith",
    url: "http://localhost:8080/",
    bannerUrl: "https://dummyimage.com/600x400/000/fff"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }));

console.log(metalsmith)

if (module.parent) {
  module.exports = metalsmith
} else {
  metalsmith.build(function (err) { if (err) throw err })
}
