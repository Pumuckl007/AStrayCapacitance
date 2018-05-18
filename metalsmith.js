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
  {title : "A",
  link: "/posts/a/",
  discription: "This is the A project, it has a lot of good ideas in it.",
  imgUrl: "https://dummyimage.com/600x400/000/fff"},
  {title : "C",
  link: "/posts/a/",
  discription: "This is the A project, it has a lot of good ideas in it.",
  imgUrl: "https://dummyimage.com/600x400/000/fff"}
]

var metalsmith = Metalsmith(__dirname);
  metalsmith.metadata({
    title: "A Stray Capacitance",
    description: "A blog about what I do.",
    generator: "Metalsmith",
    url: "http://localhost:8080/",
    bannerUrl: "https://dummyimage.com/600x400/000/fff",
    previews: previews
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
