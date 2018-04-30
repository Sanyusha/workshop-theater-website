const fsextra = require('fs-extra');
const fs = require('fs');
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path');
const PORT = process.env.PORT || 5000;
var app = express();

var STORAGE = path.resolve("storage");
var DOCS = path.resolve(STORAGE, "docs");
var ABOUT = path.resolve(DOCS, "about");

function initStorage() {
  fsextra.ensureDirSync(STORAGE);
  fsextra.ensureDirSync(DOCS);
  fsextra.ensureDirSync(ABOUT);
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin/index.html')));

app.post('/admin/save_about', saveAbout);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

function saveAbout(req, res) {
  var about = req.body.about;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  var fAbout = path.resolve(ABOUT, "about");

  console.log("admin/save_about post request", about, email, phone, address);

  fsextra.ensureFileSync(fAbout);

  fs.writeFile(fAbout, about, (err) => {
    if (err) throw err;
    console.log('about has been saved!');

    res.json({"status": "updated"});
  });
}
