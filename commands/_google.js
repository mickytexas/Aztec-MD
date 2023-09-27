const google = require('google-it');
const { fancy, box, magic, rainbow } = require("@viper-x/fancytext");

module.exports = {
  name: "google",
  description: "Search random stuff",
  category: "Search",
  async xstart(vorterx, m, { xReact, text, args }) {
    await xReact("📍");
    google({ 'query': text }).then(res => {
      let aztec = `🔎 *GOOGLE SEARCH RESULTS* 🔍\n\n${text}\n\n`;

      for (let g of res) {
        aztec += `📚 *Title*: ${g.title}\n`;
        aztec += `📝 *Description*: ${g.snippet}\n`;
        aztec += `🌐 *Link*: ${g.link}\n\n───────────────────────\n\n`;
      }

      const templates = [
        { name: "Template 1", text: fancy(aztec, "bold") },
        { name: "Template 2", text: fancy(aztec, "italic") },
        { name: "Template 3", text: box(aztec) },
        { name: "Template 4", text: magic(aztec) },
        { name: "Template 5", text: rainbow(aztec) },
      ];

      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

      const img = "https://i.ibb.co/k2mkzHJ/IMG-20230723-WA0071.jpg";
      vorterx.sendMessage(m.from, { image: { url: img }, caption: selectedTemplate.text }, { quoted: m });
    }).catch(err => {
      console.error(err);
    });
  },
};
