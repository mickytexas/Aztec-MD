//===============

// MDE WITH LUV BY DIEGOSON 

//================

const fs = require("fs");
require("../config");

module.exports = {
  name: 'alive',
  category: 'General',
  description: 'A command to test if the bot is online',
  async xstart(vorterx, m, { args, xReact }) {
    await xReact("💗");

    const aztec = fs.readFileSync("./lib/imogs.jpg");
    const msg = `*Hey ${m.pushName}! This is ${process.env.BOTNAME}, developed by Diegoson*\n\n👾 *Description*: WhatsApp user bot\n\n👾 *Prefix*: ${process.env.Prefix}\n\n📲 *Version*: 3.0.0\n\nType ${process.env.Prefix}menu to get the full command list`;

    const template = `
╭─💗 *Bot Status*
│
├ Hey ${m.pushName}! This is ${process.env.BOTNAME}, developed by Diegoson
├
├ 👾 *Description*: WhatsApp user bot
├ 👾 *Prefix*: ${process.env.Prefix}
├ 📲 *Version*: 3.0.0
│
├ Type ${process.env.Prefix}menu to get the full command list
│
╰──────────⭑ ©vorterx
    `;

    const messageOptions = {
      image: aztec,
      caption: msg,
      contextInfo: {
        externalAdReply: {
          title: 'vorterx team',
          body: 'Best to use',
          thumbnail: aztec,
          mediaType: 1,
          mediaUrl: '',
          sourceUrl: 'https://vorterx.com/',
          ShowAdAttribution: true,
        },
      },
    };

    await vorterx.sendMessage(m.from, messageOptions, { quoted: m });
  },
};
