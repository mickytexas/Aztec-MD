const config = require("../config");

module.exports = {
  name: "kick",
  alias: ["remove"],
  description: "👢 Remove a member from the group ⚠️👢⚠️",
  category: "Group",
  async xstart(vorterx, m, { text, xReact, isBotAdmin, isAdmin, mentionByTag }) {

    const userName = m.pushName;
    
    if (!isAdmin) {
      await xReact("⛔️");
      return m.reply("❌🚫 *Access denied!* You need special permissions to use this command. Please contact an administrator.");
    }

    if (!isBotAdmin) {
      await xReact("⛔️");
      return m.reply("❌🚫 *Bot security compromised!* I require administrative privileges to perform this action. Please ensure I have appropriate permissions.");
    }

    const mention = await mentionByTag();
    if (!mention || mention.length === 0) {
      await xReact("❓");
      return m.reply("❌🔍 *No user found!* Please mention the user you want to kick from the group.");
    }

    await xReact("👢");
    await vorterx.groupRemove(m.from, mention[0]);
    await vorterx.sendMessage(m.from, {text: `🚫⚠️⚡️ *User kicked by ${userName}!*`,}, { quoted: m });
    },
   };
