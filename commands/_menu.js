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
          var up_up, up_mid, up_btm, ctgry_L, ctgry_R, cmd_L, ctgry_end
            var random_menu = 0 ;
            if (!process.env.MENU) { random_menu = Math.floor(Math.random() * 0) + 1; } //make Sure to replace '2' with Exact number of how many styles you have added---- Then it takes randome_STYLE,When user did't Put any Value in 'process.env.MENU'
            
            if (random_menu == 1 || process.env.MENU.trim().startsWith("1") || process.env.MENU.toLowerCase().includes("suhail-md")) {            
              up_up =  `╭────《  *${tiny(process.env.BOTNAME)}*  》────⊷\n│ ╭──────✧❁✧──────◆`
              up_mid = `│`
              up_btm = `│ ╰──────✧❁✧──────◆\n╰══════════════════⊷`
              ctgry_L =  `╭────❏`
              ctgry_R =  `❏ \n`
           cmd_L =     `│`
              ctgry_end =`\n╰━━━━━━━━━━━━━━──⊷`
            }else{
              up_up =  `┏━━⟪ *${tiny(process.env.BOTNAME)}* ⟫━━⦿`
              up_mid = `┃ ✗`
              up_btm = `┗━━━━━━━━━━━━━━⦿`
              ctgry_L  = `\n┌──『`
              ctgry_R  = `』──❖\n\n`
            cmd_L = ` | `
              ctgry_end =`\n\n└─────────◉\n`
            
      }
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

    let vorterxInstant = `${up_up}
${up_mid} User: ${tiny(userName)}
${up_mid} BotName: ${tiny(BotName)}
${up_mid} Prefix: ${tiny(PREFIX}
${up_mid} Runtime: ${tiny(runtime(process.uptime()))}
${up_mid} Time: ${tiny(time)}
${up_mid} Date: ${tiny(date)}
${up_btm}\n${formattedCommandList}`;

      await vorterx.sendMessage(m.from, { image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: vorterxInstant }, { quoted: m });
    } catch (err) {
      m.reply("👮‍♂️Oops! Something went wrong. Please try again later.");
      console.log(err, 'red');
    }
  }
};
