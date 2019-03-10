const fs = require('fs');
const xml2js = require('xml2js');
const escape = require('xml-escape');
const program = require('commander');

const VERSION = require('./package.json').version;
const XML_IGNORE = '<>\"';

program
  .version(VERSION, '-v, --version')
  .arguments('<file>')
  .action(file => {
    const xmlParser = new xml2js.Parser();

    let Dictionary;

    function setupDict() {
      return new Promise((resolve, reject) => {
        let rawData = fs.readFileSync(file);
        data = escape(rawData.toString(), XML_IGNORE);
        xmlParser.parseString(data, (err, obj) => {
          if (err) reject(err);
          else resolve(obj.JMdict.entry);
        });
      });
    }

    setupDict().then(val => {
      Dictionary = val;
      fs.writeFileSync(`${file}.json`, JSON.stringify(Dictionary), 'utf8');
    }).catch(console.log);
  })

program.parse(process.argv);
