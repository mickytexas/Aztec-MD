const config = require('../config.js');

module.exports = {
  name: "auto-react",
  description: "Enable or disable auto-reactions",
  category: "user",
  async xstart(vorterx, m, { xReact, activeAutoReact, deactiveAutoReact }) {
    
   if (m.author.id !== config.mods) {
      await xReact("❌ You are not authorized to use this command.");
      return;
    }

    const command = m.body.toLowerCase();
    if (command === "active_auto react") {
      activeAutoReact();
      const reactions = ["👍", "❤️", "😄", "🔥", "🎉", "🌟", "👏", "😊", "🥳", "💯"];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      await xReact(randomReaction + " Auto-reactions enabled!");
    } else if (command === "deactive_auto react") {
      deactiveAutoReact();
      const reactions = ["👎", "💔", "😔", "🙅‍♀️", "😢", "👻", "😞", "🚫", "😕", "😭"];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      await xReact(randomReaction + " Auto-reactions disabled!");
    } else {
      const reactions = ["❌", "⚠️", "🤔", "🙄", "🔍", "🤷‍♂️", "🤦‍♀️", "👀", "💭", "👉"];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      await xReact(randomReaction + " Invalid command. Please use `active_auto react` or `deactive_auto react`.");
    }
   },
  };
