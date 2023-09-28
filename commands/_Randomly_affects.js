//==========

// THIS IS A LOGO MAKER WHICH CAN 
//   CREATE ANY LOGO RANDOMLY JUST BY YOUR TEXT

//MADE BY DIEGOSON FENANDEZ

const axios = require('axios');

module.exports = {
  name: "textfilter",
  description: "Create text filter logos",
  category: "logomaker",
  async xstart (vorterx, m, { xReact, text, args }) {
    if (!text) {
      await xReact("🤬");
      return m.reply("Please provide the text for the logo.");
    }
    await xReact("👻");

    try {
      const response = await axios.get(`https://api.texteffects.io/v1/effects?text=${encodeURIComponent(text)}`);
      const logos = response.data;

      if (logos.length === 0) {
        return m.reply("No text filter logos available for the provided text.");
      }

      const randomLogo = logos[Math.floor(Math.random() * logos.length)];

      vorterx.sendMessage(
        m.from,
        { image: { url: randomLogo.url }, caption: `*Requested by*: *${m.pushName}*\n*Created by*: *${process.env.BOTNAME}*\n` },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error creating text filter logo:", error);
      m.reply("An error occurred while creating the text filter logo. Please try again later.");
    }
  }
};
