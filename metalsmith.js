var Metalsmith       = require('metalsmith');
var markdown         = require('metalsmith-markdown');
var layouts          = require('metalsmith-layouts');
var permalinks       = require('metalsmith-permalinks');
var Runner           = require('metalsmith-start').Runner;
var collections      = require('metalsmith-collections');
var pagination       = require('metalsmith-pagination');
var dateFormatter    = require('metalsmith-date-formatter');

process.env.TZ = 'Pacific';

var previews = [
  {title : "8-Bit Computer Simulator",
  link: "/blogs/8-Bit-Simulator/",
  discription: "A simulator for an extended version of Ben Eater's 8-bit computer.",
  imgUrl: "/images/8bitsimulator.png"},
  {title : "C",
  link: "/blogs/a/",
  discription: "This is the A project, it has a lot of good ideas in it.",
  imgUrl: "https://dummyimage.com/600x400/000/fff"}
]

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
        pattern: 'blogs/*.md'
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
  }));

if (module.parent) {
  module.exports = metalsmith
} else {
  metalsmith.build(function (err) { if (err) throw err })
}
