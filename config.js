const fs = require('fs');
require('dotenv').config();
const chalk = require('chalk');

let config = {
  botName: process.env.BOTNAME || 'AZTEC MD',
  prefix: process.env.PREFIX || '.',
  owner_number: process.env.OWNER_NUMBER || '27686881509',   
  session: process.env.SESSION || 'add something',
  thumb: process.env.THUMB || 'https://i.ibb.co/C7TXRcH/photo-1678483789107-0029c61fdcca.jpg',
  mongodb_urI: process.env.MONGODB_URI || 'mongodb+srv://mk:mk@new.vxtfxii.mongodb.net/?retryWrites=true&w=majority',//Replace this
  caption: process.env.CAPTION || 'By Aztec MD',
  mods: process.env.MODS ? process.env.MODS.split(',') : [],
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
  console.log(chalk.yellowBright('Gracefully shutting down...'));
  process.exit();
});
