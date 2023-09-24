//================================>

// AZTEC MD V3.0.0

//================================>

module.exports = {
  name: "yts",
  description: "To search anything",
  category: "Download",
  async xstart(vorterx,m,{xReact, text,args}) {

  if (!args) { await xReact("⛔"); return m.reply("*Provide a query example how to create Aztec*");
  }
    await xReact("🔍");
                const yts = require("yt-search")
                let search = await yts(text)
                let txt = '*YOUTUBE SEARCH*\n\n *RESULTS* '+text+'\n\n'
                let no = 1;
                for (let i of search.all) {
                    txt += `\n*╭────❰*\n*❒No* : ${no++}\n*❒Type* : ${i.type}\n*❒X ID* : ${i.videoId}\n*❒Title* : ${i.title}\n*❒Views* : ${i.views}\n*❒Duration* : ${i.timestamp}\n*❒Updated* : ${i.ago}\n*❒Url* : ${i.url}\n*╰─────────────⭓*\n\n`
                }
                vorterx.sendMessage(m.from, { image: { url: search.all[0].thumbnail },  caption: txt }, { quoted: m })
  }
};

//================================>
