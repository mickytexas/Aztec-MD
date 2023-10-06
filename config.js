const fs = require('fs');
require('dotenv').config();
const chalk = require('chalk');

let config = {
  botName: process.env.BOTNAME || 'AZTEC MD',
  prefix: process.env.PREFIX || '.',
  owner_number: process.env.OWNER_NUMBER || '27686881509',   
  session_id: process.env.SESSION_ID || 'add something',
  level_up: process.env.LEVEL_UP || '', //Set true or false or enable/ disable
  menu: process.env.MENU || '', //2 Is default menu aztec 0 is Suhail md menu 
  thumb: process.env.THUMB || 'https://i.ibb.co/C7TXRcH/photo-1678483789107-0029c61fdcca.jpg',
  LANG: process.env.IMAGES || 'VOR_TERX', //changethis and add yours
  mods: process.env.MODS ? process.env.MODS.split(',') : [],
  neofetchOptions: {
    os: true,
    kernel: true,
    uptime: true,
    packages: true,
    shell: true,
  },
  fileUrl: process.env.FILE_URL || 'https://example.com/file',
  uploadFileUrl: process.env.UPLOAD_FILE_URL || 'https://example.com/upload',//https://eu.httpbin.org/stream-bytes/500000
};

module.exports = config;

const configFile = require.resolve(__filename);

watchAndReloadConfig(configFile);

function watchAndReloadConfig(filePath) {
  fs.watchFile(filePath, () => {
    console.log(chalk.redBright(`Configuration file '${filePath}' updated`));
    delete require.cache[filePath];
    config = require(filePath);
  });
}

process.on('SIGINT', () => {
  console.log(chalk.yellowBright('📴Gracefully shutting down...'));
  process.exit();
});
