import fetch from 'node-fetch'

module.exports = {
    name: "gpt",
    alias: ["ai", "openai"],
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
thumbnailUrl: "https://i.ibb.co/C7TXRcH/photo-1678483789107-0029c61fdcca.jpg",
sourceUrl: "wa.me/27686881509",
mediaType: 1,
renderLargerThumbnail: true
      }
    } 
        },{quoted: m})
            
} catch (err) {
        } 
     }
}
