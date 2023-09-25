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

        try {
        await vorterx.sendMessage(m.from,{
text: receive.results,
contextInfo: {
externalAdReply: { 
title: 'CHAT_GPT',
body: '',
thumbnailUrl: "https://telegra.ph/file/7a385897829927b981dfa.jpg",
sourceUrl: "wa.me/27686881509",
mediaType: 1,
renderLargerThumbnail: true
      }
    } 
        }
    }
    }
    }
            
    },{quoted: m}
  );
