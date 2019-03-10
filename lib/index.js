"use strict";

var fs = require('fs');

var xml2js = require('xml2js');

var escape = require('xml-escape');

var program = require('commander');

var VERSION = require('../package.json').version;

var XML_IGNORE = '<>"';
program.version(VERSION, '-v, --version').arguments('<file>').action(function (file) {
  var xmlParser = new xml2js.Parser();
  var Dictionary;

  function setupDict() {
    return new Promise(function (resolve, reject) {
      var rawData = fs.readFileSync(file);
      var data = escape(rawData.toString(), XML_IGNORE);
      xmlParser.parseString(data, function (err, obj) {
        if (err) reject(err);else resolve(obj.JMdict.entry);
      });
    });
  }

  setupDict().then(function (val) {
    Dictionary = val;
    fs.writeFileSync("".concat(file, ".json"), JSON.stringify(Dictionary), 'utf8');
  }).catch(console.log);
});
program.parse(process.argv);