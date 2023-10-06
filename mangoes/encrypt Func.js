const axios = require('axios');
const fs = require('fs');
const config = require('../config.js');

function loadLanguage() {
  return new Promise((resolve, reject) => {
      let langFile = './Images/' + config.LANG + '.json';

      fs.readFile(langFile, 'utf8', (err, data) => {
      if (err) {
      fs.readFile('./Images/VOR_TERX.json', 'utf8', (err, data) => {
      if (err) {
      reject(err);
      } else {
      resolve(JSON.parse(data));
      }
      });
      } else {
      resolve(JSON.parse(data));
      }
      });
      });
      }

    function getString(file) {
    return json['STRINGS'][file];
    }

    function displayMessage(message) {
    console.log('Message:', message);
    }

    async function init() {
    try {
    const jsonData = await loadLanguage();
    json = jsonData;
    let LangG = getString('global');
    displayMessage('Loading ' + config.LANG + ' language...');
    } catch (error) {
    console.error('Failed to load language:', error);
    }
    }

  init();


  module.exports = {
  language: json,
  getString: getString
};
