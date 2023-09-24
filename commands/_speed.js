const config = require('../config')
const fs = require("fs");

module.exports = {
   name: 'ping',
   category: 'user',
   description: 'to check ping',
  async xstart(vorterx, m, { xReact }) {
  await xReact("🚀");
      /*  var start = new Date().getTime();
	var msg = await m.reply('*𝆺𝅥 ʀᴜɴɪɴɢ 𝆺𝅥*');
	var end = new Date().getTime();
	var responseTime = end - start;
	await m.reply(`*☇ ꜱᴩᷨᴇͦᴇͭᴅ ☁ : ${responseTime}ms*`);
 }
};*/
	
	//Copyright by vorterx

	  const speed = require("performance-now");
const {spawn, exec, execSync} = require("child_process");

	let timestamp = speed();
         let latensi = speed() - timestamp;
         exec(`neofetch --stdout`, (error, stdout, stderr) => {
          let child = stdout.toString("utf-8");
          let aztec = child.replace(/Memory:/, "Ram:");
          m.reply(`${aztec}*🛑Performance* : ${latensi.toFixed(4)} _ms_`);
            });
}
    };
  
