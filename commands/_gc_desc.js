module.exports = {
  name: "desc",
  description: "Change group description",
  category: "Group",
  async xstart(vorterx, m, { isGroup, isBotAdmin, text, xReact }) {
    if (!isGroup) {
      await xReact("⛔");
      return m.reply(`\`\`\`
╭━━━┳━━━┳━━━┳━╮╭━┳━━━┳━━━┳━━━╮
┃╭━╮┃╭━╮┃╭━╮┃┃╰╯┃┃╭━╮┃╭━╮┃╭━╮┃
┃╰━╯┃╰━╯┃╰━━╮╰╮╭╯┃┃╰━╯┃╰━╯┃╰━╯┃
┃╭━━┫╭━━╋━━╮┃╭╯╰╮┃┃╭━━┫╭╮╭┫╭╮╭╯
┃┃╱╱┃┃╱╱┃╰━╯┃┃╭╮┃┃┃┃╱╱┃┃┃╰┫┃┃╰╮
╰╯╱╱╰╯╱╱╰━━━┻╯╰╯╰┻╯╱╱╰╯╰━┻╯╰━╯
\`\`\``);
    }

      if (!isBotAdmin) {
      await xReact("⛔");
      return m.reply(`\`\`\`
⚠️ I'm sorry, but I need to be an admin to respond. ⚠️
\`\`\``);
    }

      if (!text) {
      await xReact("⛔");
      return m.reply(`\`\`\`
❗ Please provide a new description. ❗
\`\`\``);
    }

    let Message = "";
    switch (text.toLowerCase()) {
      case "Message1":
        Message = "Welcome to our group! Feel free to join the conversation and make new friends.";
        break;
      case "Message2":
        Message = "This group is dedicated to discussing the latest trends in technology. Let's stay up-to-date!";
        break;
      case "Message3":
        Message = "We are a community of book lovers. Share your favorite reads and recommendations here!";
        break;
      default:
        Message = text;
    }

    await xReact("✔️");
    await vorterx.groupUpdateDescription(m.from, Message);
    await m.reply(`\`\`\`
✅ Successfully updated the group description. ✅
\`\`\``);
  }
};
