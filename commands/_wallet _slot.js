module.exports = {
  name: 'wallet',
  category: 'economy',
  description: 'Shows the wallet value',
 async xstart(vorterx, m, { xReact, text, args }) {
    
    await xReact("🗽");
    const walletValue = (await vorterx.cradit.get(`${m.sender}.wallet`)) || 0;
    vorterx.sendMessage(m.from,`*Wallet:* ${walletValue}`,m.id);
   }
   };
