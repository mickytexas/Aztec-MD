module.exports = {
  name: "leave",
  description: "Leave the group you are currently in",
  category: "Group",
  async xstart(vorterx, m, { isAdmin, isGroup, xReact, isBotAdmin }) {
    if (!isGroup) {
      const reactions = ["❌", "🚫", "🙅‍♀️", "🤷‍♂️"];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      await toReact(randomReaction);
      return m.reply("*🤔 Where are you heading? This command is for groups only.*");
     }

    const reactions = ["👋", "👋🏼", "🤚", "✌️", "👋🏽"];
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    await xReact(randomReaction);

     const Diegoson = [
      "👋 Farewell, mates! Until we meet again! 👋",
      "🚶‍♂️ Leaving the group now. Take care, everyone! 🚶‍♂️",
      "👋 It's time for me to say goodbye. Stay awesome! 👋",
      "🌟 Departing from the group. See you on the flip side! 🌟",
      "👋 Leaving the group. Thanks for the memories! 👋",
     ];

     const randomTemplate = Diegoson[Math.floor(Math.random() * Diegoson.length)];
     const caption = `*${randomTemplate}*`;

     await m.reply(caption);
    await vorterx.groupLeave(m.chat, m.from);
   },
  };
