//================================>

//  AZTEC MD V3.0.0

// MADE WITH LUV BY DIEGOSON

//================================>
const { getBuffer } = require("../mangoes/myFunc.js");
const yts = require("youtube-yts");

module.exports = {
  name: "xyt",
  description: "Search for music link",
  category: "Download",
  async xstart(vorterx, m, { xReact, text }) {
    if (!text) {
      await xReact("⛔");
      return m.reply("Please provide a search term. Example: xyt hope");
    }

    await xReact("🎵");
    const search = await yts(text);
    const randomVideo = search.videos[Math.floor(Math.random() * search.videos.length)];
    const thumbnail = await getBuffer(randomVideo.thumbnail);

    const caption = `
🎧 *${randomVideo.title}*
🆔 *ID*: ${randomVideo.videoId}
👀 *Views*: ${randomVideo.views}
⏰ *Uploaded At*: ${randomVideo.ago}
👤 *Author*: ${randomVideo.author.name}

🔗 [Watch on YouTube](${randomVideo.url})
    `;

    const template = `
╭─🎵 *Music Search Results*
│
├ 🎧 *Title*: ${randomVideo.title}
├ 🆔 *ID*: ${randomVideo.videoId}
├ 👀 *Views*: ${randomVideo.views}
├ ⏰ *Uploaded At*: ${randomVideo.ago}
├ 👤 *Author*: ${randomVideo.author.name}
│
├─🔗 [Watch on YouTube](${randomVideo.url})
│
╰─────────⭑ ©vorterx
    `;

    vorterx.sendMessage(m.from, { image: thumbnail, caption: caption }, { quoted: m });
    }
}
  
