const fs = require("fs");

module.exports = {
  name: "daily",
  description: "daily gold for slot",
  category: "economy",
  async xstart(vorterx, m, { text, xReact, isGroup, args }) {
    
     if (!isGroup) {
     await xReact("😎");
     return vorterx.sendMessage(m.from,{ text: "*😐This command can only work in groups*" },{ quoted: m });
     }
     await xReact("🏙️");
     let user = m.sender;
     const cara = "cara";
     const daily = { cd: false, cdL: "00:00:00", amount: 10000 };
     if (daily.cd) {
     await vorterx.sendMessage(m.from,{image: fs.readFileSync("./lib/images/daily.png"),caption:`\n『 😃 You already claimed your daily revenue, Come back in ${daily.cdL} to claim again 』`,},{ quoted: m });
     } else {
     return vorterx.sendMessage(m.from, { text: `『 🎉 You have claimed your daily revenue of ${daily.amount} 』` },{ quoted: m });
     }
     },
    };
