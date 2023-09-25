module.exports = {
  name: "xnxxdn",
  description: "To download xnxx videos",
  category: "Download",
  async xstart (vorterx,m,{xReact, text,args})  {

  const axios = require("axios");

  
      if (!text) { await xReact("⛔");
        m.reply(`*Missing xnxx link please provide that*`);
        return;
      }
        let urlYt = text;
        if (!urlYt.startsWith("https")) { await toReact("⛔"); return m.reply(`*Provide me an xnxxvd link*`);
                                        }
      await xReact("🍑");

        const res = await axios(`https://raganork-network.vercel.app/api/xvideos/download?url=${text}`);
        const video = res.data;


        let buttonMessage = {
          video: video,
          mimetype: 'video/mp4',
          fileName: `vorterx.mp4`,
          caption: `*╭────❰*\n
*❒* *TITLE*: *XNXX*\n
*❒* *BOTNAME*: *${process.env.BOTNAME}*
*╰─────────────*`,
          gifPlayback: false,
          height: 496,
          width: 640,
          headerType: 4,
          headerType: 4,

        }
        return await vorterx.sendMessage(m.from, buttonMessage, { quoted: m })
      } 
};
