const fsextra = require('fs-extra');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const STORAGE = path.resolve("storage");
const DOCS = path.resolve(STORAGE, "docs");
const ABOUT = path.resolve(DOCS, "about");

/**
 * Stores a field that we got from request to a file on file system
 */
function writeFieldToFile(field, value) {
  var fField = path.resolve(ABOUT, field);

  logger.log('debug', 'writeFieldToFile', {field : fField, value : value});

  fsextra.ensureFileSync(fField);

  fs.writeFile(fField, value, (err) => {
    if (err) {
      throw err;
    };
  });
}

/**
 * Updates about info on the server
 */
module.exports.updateAbout = function(req, res) {
  for (field in req.body) {
    if (req.body.hasOwnProperty(field)) {
      try {
        writeFieldToFile(field, req.body[field]);
      } catch (err) {
        throw err;
      }
    }
  }

  res.json({"status": "about section updated"});
}
