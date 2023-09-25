//===================°°°°°°°
//
//AZTEC MD WABOT VERSION 3.0.0
//
//===================°°°°°°°

module.exports = {
    name: "gpt",
    alias: ["ai", "openai"],
    category: "CHATGPT",
    desc: "To research something",
    async xstart(vorterx,m,{xReact, doReply,text,args }) {
      if(!text) 
      { await xReact('❌');
              return doReply('*Provide me a query ex Who is Aztec*');
          } 
      await xReact('🤖');
         var ai = await fetch(`https://aemt.me/openai?text=${text}`);
        var receive= await ai.json();

        try {
            
        await vorterx.sendMessage(m.from,{
text: receive.result,
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
