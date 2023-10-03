const { getBuffer } = require('../mangoes/myFunc.js');
const { AptoideScraper } = require('aptoide-scraper');

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
      return 'App not found.';
      }

     const app = searchResults[0];      
     const appDetails = await scraper.appDetails(app.appId);
     if (!appDetails) {
        return 'Could not found app sorry.';
      }

      const downloadLink = appDetails.file.url;
      const axios = require('axios');
      const response = await axios.get(downloadLink, { responseType: 'arraybuffer' });

      const apkFilePath = `${appDetails.file.name}.apk`;
      require('fs').writeFileSync(apkFilePath, response.data);

      await xReact('👍');
      const firstCaption = `*📚 Name:* ${appDetails.name}\n`
        + `*📦 Developer:* ${appDetails.developer}\n`
        + `*⬆️ Last update:* ${appDetails.updated}\n`
        + `*📥 Size:* ${appDetails.file.size}\n`
        + `*🤖 BotName:* ${BotName}`;

      const imageBuffer = await axios.get(appDetails.image, { responseType: 'arraybuffer' });
      await vorterx.sendImage(
      m.from,
      Buffer.from(imageBuffer.data, 'binary'),
     `${appDetails.name}.jpg`,
      firstCaption
      );

      await vorterx.sendFile(m.from, apkFilePath, `${appDetails.file.name}.apk`);
      return 'APK file sent successfully.';
    } catch (error) {
      console.error('Error:', error);
      return 'An error occurred while downloading the APK file.';
     }
    },
  };
