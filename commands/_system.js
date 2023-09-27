const { formatp, runtime } = require("../mangoes/myFunc.js");
const chalk = require("chalk");
const { bubble } = require("@viper-x/fancytext");
const { getLatestGPTVersion } = require("../lib/myModule.js");
const os = require("os");
const now = require("performance-now");

module.exports = {
  name: "system",
  description: "To check the system status",
  category: "user",
  async xstart(vorterx, m, { xReact }) {
    const latensi = now() - now();
    await xReact("📟");

    let aztec = `*乂 SYSTEM - STATUS*\n\n`;
    aztec += `❲❒❳ *BotName :* ${process.env.BOTNAME}\n`;
    aztec += `❲❒❳ *Version :* 3.0.0\n`;
    aztec += `❲❒❳ *RAM :* _${formatp(os.totalmem() - os.freemem())}/${formatp(
      os.totalmem()
    )}_\n`;
    aztec += `❲❒❳ *Speed : _${latensi.toFixed(4)}sec_*\n`;
    aztec += `❲❒❳ *Runtime :* _${runtime(process.uptime())}_\n`;
    aztec += `❲❒❳ *Platform :* ${os.platform()}.com\n`;
    aztec += `❲❒❳ *Platform ID :* ${os.hostname()}\n\n`;
    aztec += `❲❒❳ *Latest GPT Version :* ${await getLatestGPTVersion()}\n\n`;
    aztec += `*©vorterx-team*`;

    const formattedAztec = chalk.bold(aztec);

    const templates = [
      { name: "Template 1", text: formattedAztec },
      { name: "Template 2", text: formattedAztec },
      { name: "Template 3", text: formattedAztec },
      { name: "Template 4", text: bubble(aztec, "blue") },
      { name: "Template 5", text: bubble(aztec, "green") },
      { name: "Template 6", text: bubble(aztec, "purple") },
    ];

    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

    const img = `https://i.ibb.co/GnZ0J9K/IMG-20230723-WA0085.jpg`;
    vorterx.sendMessage(m.from, { image: { url: img }, caption: selectedTemplate.text });
  },
};
