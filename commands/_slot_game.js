const SlotMachine = require('slot-machine');
const { SlotSymbol } = SlotMachine;

module.exports = {
  name: 'slot',
  description: 'Play a slot game',
  category: 'Games',
  async xstart(vorterx, m, { text, args,xReact }) {
  
    const currentDay = new Date().getDay();

    if (currentDay === 1 || currentDay === 3) {
      return m.reply('*Sorry, the slot game is not available on Mondays and Wednesdays*');
    }

    if (currentDay < 2 || currentDay > 6) {
      return m.reply('*Sorry, the slot game is only available from Tuesdays to Sundays*');
    }

     const cradits = (await vorterx.cradit.get(`${m.sender}.wallet`)) || 0;
     if ((cradits - amount) < 0) {
      return m.reply('*You dont have that much in your wallet damn*');
     }

      if (!args) {
      await xReact("😃");
      return m.reply('*Please provide the amount to continue*');
      }

      const amount = parseInt(args);

     if (isNaN(amount) || amount <= 0) {
      await xReact("😃");
      return m.reply('*Invalid amount. Please provide a positive number*');
     }

     const symbols = [
      new SlotSymbol('a', {
        display: '💎',
        points: 29,
        weight: 100
      }),
      new SlotSymbol('b', {
        display: '🍀',
        points: 9,
        weight: 100
      }),
      new SlotSymbol('c', {
        display: '🔔',
        points: 5,
        weight: 40
      }),
      new SlotSymbol('d', {
        display: '🍒',
        points: 2,
        weight: 75
      }),
      new SlotSymbol('e', {
        display: '🍊',
        points: 2,
        weight: 75
      }),
      new SlotSymbol('f', {
        display: '🍋',
        points: 10,
        weight: 20
      })
     ];

     const machine = new SlotMachine(3, symbols);

     const results = machine.play();

     const reels = results.grid.map(symbol => symbol.display);

     let txt = '🎰 *SLOT MACHINE* 🎰\n\n';

     txt += `
      ---------
      | ${reels[0]} | ${reels[1]} | ${reels[2]} |
      ---------
    `;

    const points = results.totalPoints;
    const resultAmount = amount * points;

    txt += points <= 0 ? `\n\n📉 You lost ${amount} of gold` : `\n\n📈 You won ${resultAmount} of gold`;

    m.reply(txt);
   },
   };
