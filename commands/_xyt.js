//================================>

//  AZTEC MD V3.0.0

//================================>
const {getBuffer} = require("../mangoes/myFunc.js");
const yts = require("youtube-yts");

module.exports = {
   name: "xyt",
   description: "To search for music link",
   category: "Download",
   async xstart(vorterx,m,{xReact,text,args})  {

if (!text) { await xReact("⛔"); return m.reply("*Please give a term example  xyt hope*");
           }
    await xReact("🌛");
let search = await yts(text)
url = search.videos[0].url
let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
diego = await getBuffer(anu.thumbnail)
let aztec = `*╭────❰*\n
*❒* *Title* : *${anu.title}*\n
*❒* *ID* : *${anu.videoId}*\n
*❒* *Viewers* : *${anu.views}*\n
*❒* *Upload At* : *${anu.ago}*\n
*❒* *Author* : *${anu.author.name}*\n
*❒* *Link* : ${anu.url}\n
*╰─────────────⭓*\n\n*©vorterx* 
`
vorterx.sendMessage(m.from, { image : diego, caption: aztec }, { quoted: m})
   }
};

//================================>
