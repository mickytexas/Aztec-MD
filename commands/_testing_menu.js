//
Certainly! I have modified the code to include the replying number method. When the user sends the `menu` command, the bot will send the menu with categories and command numbers. The user can reply with a number like `1.2` to get the commands from that specific category.

Here's the const path = require("path");
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
        let categoryIndex = 1;
        let commandIndex = 1;

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
         .map((cmd, index) => {
         const commandNumber = `${categoryIndex}.${commandIndex}`;
         commandIndex++;
         return `${cmd_L} ${commandNumber}. ${PREFIX}${cmd}`;
         })
        .join("\n");

        formatted += `${ctgry_L} *${capitalizedFile}* ${ctgry_R}\n\n`;
        formatted += `\`\`\`${aliasesList}\`\`\`${ctgry_end}\n`;

        categoryIndex++;
        commandIndex = 1;
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

              const menuMessage = await vorterx.sendMessage(m.from, { image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: vorterxInstant }, { quoted: m });

              const replyListener = vorterx.addMessageListener((message) => {
              if (message.from === m.from && message.quotedMsg && message.quotedMsg.id.equals(menuMessage.id)) {
              const replyText = message.quotedMsg.body;
              const commandNumbers = replyText.split('.').map(Number);

              if (commandNumbers.length === 2) {
              const [categoryIndex, commandIndex] = commandNumbers;
              const selectedCategory = uniqueCommands[categoryIndex - 1];

              if (selectedCategory) {
              const [file, ...aliases] = selectedCategory;
              const capitalizedFile = file.replace(".js", "").charAt(0).toUpperCase() + file.replace(".js", "").slice(1);
              const selectedCommand = aliases[commandIndex - 1];

               if (selectedCommand) {
                const commandInfo = require(path.join(pluginsDir, file));
                const { description } = commandInfo;

                const commandDetails = `
**Command**: ${PREFIX}${selectedCommand}
**Category**: ${capitalizedFile}
**Description**: ${description}`;

                vorterx.sendMessage(m.from, commandDetails, { quoted: message });
              } else {
                vorterx.sendMessage(m.from, "Invalid command number. Please try again.", { quoted: m });
              }
             } else {
              vorterx.sendMessage(m.from, "Invalid category number. Please try again.", { quoted: m });
            }
           } else {
            vorterx.sendMessage(m.from, "Invalid reply number. Please provide the category and command numbers separated by a dot (e.g., 1.2).", { quoted: m });
          }

        vorterx.removeMessageListener(replyListener);
        }
       });
      } catch (err) {
      m.reply("👮‍♂️Oops! Something went wrong. Please try again later.");
      console.log(err, 'red');
     }
    }
   };
