const fs = require('fs');
const xml2js = require('xml2js');
const escape = require('xml-escape');
const program = require('commander');

const { log } = console;

const XML_IGNORE = '<>"';

program
  .arguments('<file>')
  .action((file) => {
    const xmlParser = new xml2js.Parser();

    function setupDict() {
      return new Promise((resolve, reject) => {
        fs.readFile(file, (err, rawData) => {
          if (err) {
            log(err);
            process.exit(1);
          }
          const data = escape(rawData.toString(), XML_IGNORE);
          xmlParser.parseString(data, (parseError, obj) => {
            if (parseError) reject(parseError);
            else resolve(obj.JMdict.entry);
          });
        });
      });
    }

    const outputFilename = `${file}.json`;

    setupDict().then((dictionary) => {
      fs.writeFileSync(outputFilename, JSON.stringify(dictionary), 'utf8');
    });
  });

program.parse(process.argv);
