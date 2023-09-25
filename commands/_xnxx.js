const axios = require("axios");
const fs = require("fs");

module.exports = {
  name: "xnxxsh",
  description: "18 videos only",
  category: "Download",
  async xstart(vorterx,m,{xReact, text,args})  {

  let me = fs.readFileSync("./lib/imogs.jpg");
  if(!text) {
    await xReact("⛔");
    return m.reply("Giv me a search term please*");
  }
    await xReact("👽");

  var res = (await axios(`https://raganork-network.vercel.app/api/xvideos/search?query=${text}`)).data

  let textt = "*XNXXV SEARCH*\n\nRESULTS FROM " + text + "\n\n";

 let no = 1;
  for (var video of res.result) {
    textt += `\n*╭────❰*\n *❒No* : ${no++}\n*❒Title* : ${video.title}\n*❒Duration* : ${video.duration}\n*❒Url* : ${video.url}\n*╰─────────────*\n\n`;

  }

  return vorterx.sendMessage(m.from, {
    image: me, 
    caption: textt
  }, {
    quoted: m
  });
}
    };
