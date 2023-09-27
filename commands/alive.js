//===============

// MDE WITH LUV BY DIEGOSON 

//================

const fs = require("fs");
const BOTNAME = global.botname;
const PREFIX = global.prefix;
require("../config");

module.exports = {
  name: 'alive',
  category: 'General',
  description: 'A command to test if the bot is online',
  async xstart(vorterx, m, { args, xReact }) {
    await xReact("💗");

    const aztec = fs.readFileSync("./lib/imogs.jpg");
    const msg = `*Hey ${m.pushName}!* 👋\n\nWelcome to ${global.BOTNAME}! 🤖\n\nI am a WhatsApp user bot developed by Diegoson.\n\n✨ Let's explore the world of automation together!\n\n📌 *Prefix*: ${global.prefix}\n📌 *Version*: 3.0.0\n\nType ${global.prefix}menu to get the full command list.`;

    const template = `
╭─💗 *Bot Status*
│
├ Hey ${m.pushName}! 👋
├ Welcome to ${global.BOTNAME}! 🤖
├ I am a WhatsApp user bot developed by Diegoson.
├ ✨ Let's explore the world of automation together!
├
├ 📌 *Prefix*: ${global.prefix}
├ 📌 *Version*: 3.0.0
│
├ Type ${global.prefix}menu to get the full command list.
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
