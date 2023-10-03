const { getBuffer } = require('../mangoes/myFunc.js');
const { AptoideScraper } = require('aptoide-scraper');
const config = require('../config.js');

module.exports = {
  name: 'apk',
  alias: ['app','getpack'],
  description: 'Download APKs using Aptoide Scraper',
  category: 'Downloads',
  async xstart(vorterx, m, { xReact, args, text }) {

    if (!args[0]) {
      await xReact('⛔');
      return m.reply('Please provide the app name');
    }

    const appName = args.join(' ');

    try {
      const scraper = new AptoideScraper();
      const searchResults = await scraper.search(appName);
      if (!searchResults || searchResults.length === 0) {
      return m.reply(`Sorry ${m.pushName} but ${!args[0]} could not be found.`);
      }

      const BotName = config.botName;
      const app = searchResults[0];      
     const appDetails = await scraper.appDetails(app.appId);
     if (!appDetails) {
        return m.reply('Could not found the app sorry.');
      }

      const downloadLink = appDetails.file.url;
      const axios = require('axios');
      const response = await axios.get(downloadLink, { responseType: 'arraybuffer' });

      const apkFilePath = `${appDetails.file.name}.apk`;
      require('fs').writeFileSync(apkFilePath, response.data);

      await xReact('👍');
      const D3centX = `*📚 App Name:* ${appDetails.name}\n`
        + `*📦 Developer:* ${appDetails.developer}\n`
        + `*⬆️ Last update:* ${appDetails.updated}\n`
        + `*📥 Size:* ${appDetails.file.size}\n`
        + `*🤖 BotName:* ${BotName}\n\n\n*POWERED BY VORTERX*`;

      const imageBuffer = await axios.get(appDetails.image, { responseType: 'arraybuffer' });
      await vorterx.sendImage( m.from, Buffer.from(imageBuffer.data, 'binary'),`${appDetails.name}.jpg`, D3centX);

      await vorterx.sendFile(m.from, apkFilePath, `${appDetails.file.name}.apk`);
      return 'APK file sent successfully.';
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred while downloading your App.';
     }
    },
  };
