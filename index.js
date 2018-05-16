var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var watch       = require('metalsmith-watch');
var cssPacker   = require('metalsmith-css-packer');

Metalsmith(__dirname)
  .metadata({
    title: "A Stray Capacitance",
    description: "A blog about what I do.",
    generator: "Metalsmith",
    url: "http://localhost:8080/"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(cssPacker())
  .use(layouts({
    engine: 'handlebars'
  })).use(
    watch({
      paths: {
        "${source}/**/*":true,
        "layouts/**/*": "**/*.md",
      },
      livereload: true,
    })
  )
  .build(function(err, files) {
    if (err) { throw err; }
  });
