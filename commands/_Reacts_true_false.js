//MADE WITH LUV BY 

// IN PURPOSE OF LEARNING JS
//

module.exports = {
  name: 'act',
  category: 'owner',
  active: false, 
  
  activate() {
   this.active = true;
   },
  
  deactivate() {
   this.active = false;
   },
   async executeCommand(vorterx, m, { isAdmin, isCreator, xReact, command }) {
    if (!isAdmin) return m.reply('This cmd is Only for owner.');

    if (command === 'act activate') {
      this.activate();
      return m.reply('➕️Reaction mode has been activated.');
     }

      if (command === 'act react' && this.active && isCreator && xReact) {
      let emojis = ['😀', '🐥', '🐤', '🐦', '👻', '😎', '😴', '🥫', '🍿', '🤬', '🕵️', '😁', '🤩', '😍', '😏', '🤮', '💩', '💥', '🔥', '💯', '🐺', '🌚', '🦄', '🐕', '⚽', '😊', '🎉', '🌟', '🐱', '🌈', '❤', '👥', '👺', '🎎', '👮‍♂️', '😂', '⚡️', '🍕', '🎸', '🌺', '🐧', '👀'];
      
      function getRandomEmoji() {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        return emojis[randomIndex];
       }
      
      const randomEmoji = getRandomEmoji();
      await xReact(randomEmoji);
       }

      if (command === 'act deactivate react') {
      this.deactivate();
      return m.reply('📴Reaction mode has been deactivated.');
      }
     }
    };
