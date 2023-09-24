const google = require('google-it');

module.exports = {
   name: "google",
   description: "Search random stuff",
   category: "Search",
   async xstart(vorterx,m,{xReact, text, args})  {

await xReact("📍");
google({'query': text}).then(res => {
let aztec = `*乂 GOOGLE SEARCH TERM*\n\n${text}\n\n`
for (let g of res) {
aztec += `❲❒❳ *Title* : ${g.title}\n`
aztec += `❲❒❳ *Description* : ${g.snippet}\n`
aztec += `❲❒❳ *Link* : ${g.link}\n\n────────────────────────\n\n`
} 
   img = "https://i.ibb.co/k2mkzHJ/IMG-20230723-WA0071.jpg"
vorterx.sendMessage(m.from, {image: {url: img}, caption: aztec}, {quoted: m})
     })
                             }
};
