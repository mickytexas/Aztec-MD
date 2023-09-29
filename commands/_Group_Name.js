module.exports = {
  name: "gcname",
  description: "Change the group name",
  category: "Group",
  async xstart(vorterx, m, { text, isBotAdmin, isGroup, xReact }) {
    if (!isGroup) {
      await toReact("⛔");
      return m.reply("⛔️ *This command is only for group admins.*");
    }

    if (!isBotAdmin) {
      await toReact("⛔");
      return m.reply("⛔️ *I need to be an admin to use this command.*");
    }

      if (!text) {
      await xReact("⛔");
      return m.reply("⛔️ *Please provide the new group name you want to update to.*");
    }

    await xReact("🔉");

    const D3centX = [
      "🎉 Group name successfully changed! 🎊",
      "✨ The group name has been updated! ✨",
      "🔥 New group name set! 🔥",
      "🌟 Group name has been modified! 🌟",
      "💥 Group name successfully updated! 💥",
    ];

    const randomTemplate = D3centX[Math.floor(Math.random() * D3centX.length)];
    const caption = `*${randomTemplate}*\n\n🏷️ New group name: ${text}`;

    await vorterx.groupUpdateSubject(m.from, text);
    await m.reply(caption);
   },
  };
