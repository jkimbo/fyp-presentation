/*
 * Build presentation
 */

var folder = __dirname + '/templates';

var watch = require('watch-tree').watchTree(folder, {'sample-rate': 5})
  , marked = require('marked')
  , path = require('path')
  , fs = require('fs')
  , types = [ // types of files to watch
    '.mkd',
    '.html'
  ];

/*
 * Watch for files modified
 */
watch.on('fileModified', function(file, stats) {
  if(!(path.extname(file) in oc(types))) return
  // file modified
  console.log(path.basename(file)+' file modified');
  output = compile();
});

/*
 * Compile presentation
 */
function compile() {
  var output = '';

  // get header
  output += fs.readFileSync(folder + '/header.html', 'utf-8');

  // retrieve slides
  slides = fs.readdirSync(folder + '/slides');

  // iterate over slides
  slides.forEach(function (name) {
    if(!(path.extname(name) in oc(types))) return // check if file is in types to compile

    // get pre html
    output += fs.readFileSync(folder + '/pre.html', 'utf-8');

    var slide = fs.readFileSync(folder + '/slides/' + name, 'utf-8');
    var compiled = marked(slide);
    output += compiled;

    // get post html
    output += fs.readFileSync(folder + '/post.html', 'utf-8');
  });

  // get footer
  output += fs.readFileSync(folder + '/footer.html', 'utf-8');

  fs.writeFileSync(folder + '/../index.html', output, 'utf-8');
  return output;
}

/*
 * Object converter
 * Convert array into object so that checking if a value in array can work
 */
function oc(a) {
  var o = {};
  for(var i=0;i<a.length;i++) {
    o[a[i]]='';
  }
  return o;
}
