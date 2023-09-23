require('dotenv').config()

        global.botName = process.env.BOTNAME || 'AZTEC MD',
        global.prefix = process.env.PREFIX || '.',
        global.session = process.env.SESSION || 'add something', //replace this to any text
        global.mongodb = process.env.MONGODB || '',
        global.port = process.env.PORT || '8000',
        global.caption = process.env.CAPTION || 'By Aztec MD',
        global.mods = (process.env.MODS || '').split(',')
        }
module.exports = {
mongodb: global.mongodb,
  };
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
