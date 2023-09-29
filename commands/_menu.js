const path = require("path");
const os = require('os');
const { tiny } = require("@viper-x/fancytext");
const moment = require("moment-timezone");
const fs = require("fs");

module.exports = {
  name: 'menu',
  alias: ['help'],
  category: 'General',
  description: 'Gives the full command list of the bot',
  async xstart(vorterx, m, { args, xReact, text }) {
    const BotName = process.env.BOTNAME;
    const userName = m.pushName;
    const PREFIX = process.env.PREFIX;

    await xReact('Ⓜ️');
    let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Africa/Johannesburg" })
        .split(",");
    try {
      await vorterx.sendPresenceUpdate("composing", m.from);
      const id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;

      const getUniqueCommands = (dirPath) => {
        const uniqueCommands = [];
        const files = fs.readdirSync(dirPath);

        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            uniqueCommands.push(...getUniqueCommands(filePath));
          } else if (stat.isFile() && file.endsWith(".js")) {
            const { alias = [] } = require(filePath);
            uniqueCommands.push([file, ...alias]);
          }
        }

        return uniqueCommands;
      };

      const formatCommandList = (commands) => {
        let formatted = "";

        for (const [file, ...aliases] of commands) {
          let up_up, up_mid, up_btm, ctgry_L, ctgry_R, cmd_L, ctgry_end;
          let random_menu = 0;
          if (!process.env.MENU) {
            random_menu = Math.floor(Math.random() * 2) + 1; // Replace '2' with the exact number of styles you have added
          }

          if (
            random_menu === 1 ||
            process.env.MENU.trim().startsWith("1") ||
            process.env.MENU.toLowerCase().includes("suhail-md")
          ) {
            up_up = `╭────《  *${tiny(BotName)}*  》────⊷\n│ ╭──────✧❁✧──────◆`;
            up_mid = `│`;
            up_btm = `│ ╰──────✧❁✧──────◆\n╰══════════════════⊷`;
            ctgry_L = `╭────❏`;
            ctgry_R = `❏ \n`;
            cmd_L = `│`;
            ctgry_end = `\n╰━━━━━━━━━━━━━━──⊷`;
          } else {
            up_up = `┏━━⟪ *${tiny(BotName)}* ⟫━━⦿`;
            up_mid = `┃ ✗`;
            up_btm = `┗━━━━━━━━━━━━━━⦿`;
            ctgry_L = `\n┌──『`;
            ctgry_R = `』──❖\n\n`;
            cmd_L = ` | `;
            ctgry_end = `\n\n└─────────◉\n`;
          }

          const capitalizedFile =
            file.replace(".js", "").charAt(0).toUpperCase() +
            file.replace(".js", "").slice(1);
          const aliasesList = aliases
            .map((cmd) => `${cmd_L} ${PREFIX}${cmd}`)
            .join("\n");

          formatted += `${ctgry_L} *${capitalizedFile}* ${ctgry_R}\n\n`;
          formatted += `\`\`\`${aliasesList}\`\`\`${ctgry_end}\n`;
        }

        return formatted.trim();
      };

      const pluginsDir = path.join(process.cwd(), "Commands");
      const uniqueCommands = getUniqueCommands(pluginsDir);
      const formattedCommandList = formatCommandList(uniqueCommands);

      let vorterxInstant = `${up_up}
${up_mid} User: ${tiny(userName)}
${up_mid} BotName: ${tiny(BotName)}
${up_mid} Prefix: ${tiny(PREFIX)}
${up_mid} Runtime: ${tiny(runtime(process.uptime()))}
${up_mid} Time: ${tiny(time)}
${up_mid} Date: ${tiny(date)}
${up_btm}\n${formattedCommandList}`;

      vorterxInstant += `_📔Send ${PREFIX}menu <command name> to get detailed information of a specific command_`;

      await vorterx.sendMessage(m.from, { image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: vorterxInstant }, { quoted: m });
    } catch (err) {
      m.reply("👮‍♂️Oops! Something went wrong. Please try again later.");
      console.log(err, 'red');
    }
  }
};        
