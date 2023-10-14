const fs = require("fs");
const userName = m.pushName;

module.exports = {
  name: "bank",
  description: "shows bank amount out of economy",
  category: "economy",
  async xstart(vorterx, m,{ text,xReact,args }) {
   
    await xReact("🏦");
    const user = m.sender;
    const balance = { bank: 5000, bankCapacity: 10000 };

    var role = "Low on Funds 💸";
    if (balance.bank <= 1000) {
      role = "Rising Entrepreneur 🚀";
    } else if (balance.bank <= 10000) {
      role = "Wealth Builder 💼";
    } else if (balance.bank <= 50000) {
      role = "Financial Maverick 🤑";
    } else if (balance.bank <= 1000000) {
      role = "Money Maestro 🎩";
    } else if (balance.bank <= 10000000) {
      role = "Fortune Titan 💰";
    } else if (balance.bank <= 90000000) {
      role = "Billionaire Extraordinaire 🌟";
    }

    await vorterx.sendMessage(m.from,{image: fs.readFileSync("./lib/images/bank.png"),caption: `*╭────❰* *BANK-SERVICE*\n
        *❒* *AUTHOR* *${userName}*\n
        *❒* *BANK BALANCE*: *${balance.bank}/${balance.bankCapacity}*\n
        *❒* *WEALTH*: *${role}*\n
        *╰─────────────⭓*\n`, },{ quoted: m });
       },
      };
