const config = require('../config.js')

module.exports = {
  name: 'anti-words',
  category: 'Group',
  description: 'Detects and removes users who send bad words to gc',
  enabled: true,
  async xstart(vorterx, m, { xReact, xReply, text, args, isAdmin, isGroup, isBotAdmin }) {
   
    if (!isGroup) {
    await xReact('😐'); return m.reply('Im sorry but this cmd is for Admins only');
    }
     
    if (!this.enabled) {
    return;
    }
    
    const badWords = ['offensive', 'vulgarity', 'profanity'];
    const message = text.toLowerCase();

    
    const isAdmin = m.isAdmin();
    const foundBadWords = badWords.filter(word => message.includes(word));
    if (foundBadWords.length > 0 && !isAdmin) {

     await xReact('✅');
     vorterx.sendMessage(m.from,{ text: 'Bad word detected. You have been removed to the group\n\n' +
        '╔════════════════╗\n' +
        '║   BAD WORD   ║\n' +
        '║   DETECTOR    ║\n' +
        '╚════════════════╝'
      });
       m.reply('You have been removed due to bad language');
      return;
     }
     },
    async vorterxGet_Commands() {
    return [
      {
        command: 'anti_badword-on',
        category: this.category,
        description: 'Enables the bad word detection to the gc',
        executor: async (vorterx, m) {
          if (!this.enabled) {
          this.enabled = true;
          await m.reply('Bad word detection is now enabled to the gc');
          }
         }
        },
        {
        command: 'anti_badword-off',
        category: this.category,
        description: 'Disables the bad word detection.',
        executor: async (vorterx, m) {
          if (this.enabled) {
          this.enabled = false;
          await m.reply('Bad word detection is now disabled to the group');
          }
        }
       }
     ];
   }
 };
