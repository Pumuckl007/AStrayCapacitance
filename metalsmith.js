var Metalsmith             = require('metalsmith');
var markdown               = require('metalsmith-markdown');
var layouts                = require('metalsmith-layouts');
var permalinks             = require('metalsmith-permalinks');
var Runner                 = require('metalsmith-start').Runner;
var collections            = require('metalsmith-collections');
var pagination             = require('metalsmith-pagination');
var dateFormatter          = require('metalsmith-date-formatter');
var domTransform           = require('metalsmith-dom-transform');
var codeHighlightTransform = require('metalsmith-code-highlight/transform');
var assemblyHighlight      = require('./assembly-highlight.js');
var highlight              = require('highlight.js');

process.env.TZ = 'Pacific';

var previews = [
  {title : "8-Bit Computer Simulator",
  link: "/blogs/8-Bit-Simulator/",
  discription: "A simulator for an extended version of Ben Eater's 8-bit computer.",
  imgUrl: "/images/8bitsimulator.png"},
  {title : "Cart Transmission",
  link: "/blogs/Cart-Transmission/",
  discription: "A 3D printed transmission for a cart.",
  imgUrl: "/images/Cart-Transmission/TransmissionOnshape.jpg"}
]

var codeHighlight = codeHighlightTransform({languages: [assemblyHighlight]});

var metalsmith = Metalsmith(__dirname);
  metalsmith.metadata({
    blogTitle: "A Stray Capacitance",
    description: "A blog about what I do.",
    url: "http://localhost:3000/",
    bannerUrl: "/images/cover.jpg",
    previews: previews,
    author: "Maximilian Apodaca",
    github: "https://github.com/Pumuckl007/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(collections({
    posts: {
        pattern: 'blogs/*.md',
        sortBy: 'date'
    }
  }))
  .use(pagination({
    'collections.posts': {
      perPage: 10,
      layout: 'blog.html',
      first: 'blog/index.html',
      path: 'blog/page/:num/index.html'
    }
  }))
  .use(markdown())
  .use(permalinks())
  .use(dateFormatter())
  .use(layouts({
    engine: 'handlebars',
    partials: 'src/partials/'
  })).use(domTransform({
  transforms: [
    codeHighlight
  ]
  }));

highlight.registerLanguage("assembly", assemblyHighlight);

if (module.parent) {
  module.exports = metalsmith
} else {
  metalsmith.build(function (err) { if (err) throw err })
}
