const fs = require("fs");
require("../config");

module.exports = {
   name: 'alive',
   category: 'General',
   description: 'An cmd to test if its on',
   async xstart(vorterx, m, {args, xReact })  {
      await xReact("💗");
   //let aztec = fs.readFileSync("./lib/connect/aztec.png");
     // let anexa = fs.readFileSync("./lib/connect/anexa.png");
      let msg = `*Hey ${m.pushName} This is ${process.env.BOTNAME} developed by Diegoson*\n\n*👾Descripto*: WhatsApp user bot\n\n*👾Prefix*: ${process.env.Prefix}\n\n*📲Version*: 3.0.0\n\n\nType ${process.env.Prefix}menu to get my full command list`;
      let Amarok = {
        // image: aztec,
         caption: msg,
         contextInfo: {
              externalAdReply: {
                 title: `vorterx team`,
                 body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
                 thumbnail: ,
                 mediaType: 1,
                 mediaUrl: ``,
                 sourceUrl: `vorterx.com/`,
                 ShowAdAttribution: true,
              },
         },
      };
     await vorterx.sendMessage(m.from, Amarok, { quoted: m})
                                              }
};
