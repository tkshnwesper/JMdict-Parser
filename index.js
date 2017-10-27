const fs = require('fs');
const xml2js = require('xml2js');
const escape = require('xml-escape');

const XML_IGNORE = '<>\"';
const JMDICT_PATH = './JMdict_e';

const xmlParser = new xml2js.Parser();

let Dictionary;

function setupDict() {
  return new Promise((resolve, reject) => {
    let rawData = fs.readFileSync(JMDICT_PATH);
    data = escape(rawData.toString(), XML_IGNORE);
    xmlParser.parseString(data, (err, obj) => {
      if (err) reject(err);
      else resolve(obj.JMdict.entry);
    });
  });
}

setupDict().then(val => {
  Dictionary = val;
  fs.writeFileSync('./JMdict.json', JSON.stringify(Dictionary), 'utf8');
}).catch(console.log);