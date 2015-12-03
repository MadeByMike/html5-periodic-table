var fs = require('fs');
var layout = require('periodic-layout');
var Handlebars = require('handlebars');
var sass = require('node-sass');

var elements = require('./src/elements.json');
var fblock = require('./src/f-block.json');
var keys = require('./src/keys.json');

var aspect = '9x6';
var rows = layout(elements, aspect);

var css = sass.renderSync({ data: fs.readFileSync('./src/main.scss').toString() }).css.toString();

var doc_template = Handlebars.compile(fs.readFileSync('./src/doc.html').toString());
var element_template = Handlebars.compile(fs.readFileSync('./src/elements.html').toString());

var content = element_template({"elements":rows, "fblock": fblock, 'keys':keys});
var output = doc_template({'content': content, 'css': css});

fs.writeFile("index.html", output, function(err) {
  if(err) {
    return console.log(err);
  }
  return 'Done!';
});
