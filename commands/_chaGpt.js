const fetch = require('node-fetch')

module.exports = {
    name: "ai",
    alias: ["gpt", "openai", "chatgpt"],
    category: "CHATGPT",
    desc: "To research something",
    async xstart(vorterx,m,{xReact, text,args }) {
      if(!text) 
      { await xReact('❌');
              return m.reply('*Provide me a query ex Who is Aztec*');
          } 
      await xReact('🤖');
         var ai = await fetch(`https://xzn.wtf/api/openai?text=${text}&apikey=aztec`);
        var receive= await ai.json();
      
        await m.reply(`${receive.result}`);
    }}
