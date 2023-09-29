const path = require("path");
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
          const capitalizedFile = file.replace(".js", "").charAt(0).toUpperCase() + file.replace(".js", "").slice(1);
          const aliasesList = aliases.map((cmd) => `| ${PREFIX + cmd}`).join("\n") + "\n\n└─────────◉\n\n";

          formatted += `┌─『 *${capitalizedFile}* 』─❖\n\n`;
          formatted += `\`\`\`${aliasesList}\`\`\`\n\n\n`;
        }

        return formatted.trim();
      };

      const pluginsDir = path.join(process.cwd(), "Commands");
      const uniqueCommands = getUniqueCommands(pluginsDir);
      const formattedCommandList = formatCommandList(uniqueCommands);

      const helpMessage = `┏━━⟪ ${BotName}  ⟫━⦿
┃ ✗ USER: ${userName} 
┃ ✗ BOTNAME: ${BotName}
┃ ✗ PREFIX: ${PREFIX}
┗━━━━━━━━━━⦿\n\n${formattedCommandList}`;

      await vorterx.sendMessage(m.from, { image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: helpMessage }, { quoted: m });
    } catch (err) {
      m.reply("👮‍♂️Oops! Something went wrong. Please try again later.");
      console.log(err, 'red');
    }
  }
};
