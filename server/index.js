const fsextra = require('fs-extra');
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const actions = require('./actions');
const logger = require('./logger');

const PORT = process.env.PORT || 5000;
const STORAGE = path.resolve("storage");
const DOCS = path.resolve(STORAGE, "docs");
const ABOUT = path.resolve(DOCS, "about");

var app = express();

var args = require('yargs')
.option('verbose', {
  alias: 'v',
  describe: 'set logger level to verbose',
  type: "boolean"
})
.option('debug', {
  alias: 'd',
  describe: 'set logger level to debug',
  type: "boolean"
})
.argv;

// Sets logger level according to command line arguments
function setLoggerLevel() {
  if (args.verbose) {
    logger.setLogLevel("verbose");
  }

  if (args.debug) {
    logger.setLogLevel("debug");
  }
}

function initStorage() {
  fsextra.ensureDirSync(STORAGE);
  fsextra.ensureDirSync(DOCS);
  fsextra.ensureDirSync(ABOUT);
}

setLoggerLevel();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, '../admin/index.html')));

app.post('/admin/save_about', saveAbout);

app.post('/content/about', actions.updateAbout);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

function saveAbout(req, res) {
  var about = req.body.about;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var fAbout = path.resolve(ABOUT, "about");

  fsextra.ensureFileSync(fAbout);

  fs.writeFile(fAbout, about, (err) => {
    if (err) throw err;
    console.log('about has been saved!');

    res.json({"status": "updated"});
  });
}
