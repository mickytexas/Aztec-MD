module.exports = {
  name: 'word-chain',
  category: 'games',
  description: 'A simple word chain game',
  async start(vorterx, m, { xReact, args, text }) {
    
    let currentPlayer = m.author;
    let currentWord = args[0].toLowerCase();
    let nextPlayer = m.mentions.users.first();

    if (nextPlayer && nextPlayer.id === currentPlayer.id) {
      vorterx.reply(m, 'You cannot mention yourself! Please mention another player.');
      return;
     }

     if (!nextPlayer) {
      nextPlayer = vorterx.getRandomUser(m.guild);
     }

      vorterx.reply(m, `The game has started! ${currentPlayer} starts with the word "${currentWord}". Now it's ${nextPlayer}'s turn.`);

      while (true) {
      const collectedMsg = await vorterx.awaitReply(m, `Your word must start with the last letter of the previous word (${currentWord}).\n${nextPlayer}, enter your word:`);
      const newWord = collectedMsg.content.toLowerCase();

      if (newWord === 'exit') {
        vorterx.reply(m, `${nextPlayer} has exited the game. Game over!`);
        return;
       }

       if (newWord.charAt(0) !== currentWord.slice(-1)) {
        vorterx.reply(m, `The word "${newWord}" does not start with the correct letter. ${nextPlayer} loses!`);
        return;
       }

       currentWord = newWord;
       currentPlayer = nextPlayer;
       nextPlayer = vorterx.getRandomUser(m.guild);

       const gameEmbed = vorterx.createEmbed()
        .setTitle('Word Chain Game')
        .addField('Current Word', currentWord)
        .addField('Current Player', currentPlayer)
        .addField('Next Player', nextPlayer)
        .setDescription(`${currentPlayer} has entered the word "${currentWord}". Now it's ${nextPlayer}'s turn.`);

       vorterx.sendEmbed(m.channel, gameEmbed);
     }
  }
};
