var Metalsmith       = require('metalsmith');
var markdown         = require('metalsmith-markdown');
var layouts          = require('metalsmith-layouts');
var permalinks       = require('metalsmith-permalinks');
var Runner           = require('metalsmith-start').Runner;

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
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    partials: 'src/partials/'
  }));

console.log(metalsmith)

if (module.parent) {
  module.exports = metalsmith
} else {
  metalsmith.build(function (err) { if (err) throw err })
}
