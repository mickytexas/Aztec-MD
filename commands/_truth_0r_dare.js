//MADE BY DIEGOSON 

//@AZTEC MD 

module.exports = {
  name: 'TruthOrDare',
  description: 'Truth or dare is a game to test your mind',
  category: 'games',
  async xstart(vorterx, m, { xReact, args, text }) {
      
     if (args[0] === 'TruthOrDare') {
      await vorterx.sendMessage('To play Truth or Dare, use one of the following commands:\n'
        + '`!TruthOrDare [👍truth]` - Get a truth question\n'
        + '`!TruthOrDare [👍dare]` - Get a dare task');
      return;
      }
      const { vorterx_truth, vorterx_dare } = require('../lib/_truth_0r_dare.js');

     const choice = args[0];
     let prompt;

     if (choice === 'truth') {
      prompt = vorterx_truth();
     } else if (choice === 'dare') {
      prompt = vorterx_dare();
     } else {
      const randomChoice = Math.random() < 0.5 ? 'truth' : 'dare';
      prompt = randomChoice === 'truth' ? vorterx_truth() : vorterx_dare();
     }

     await vorterx.send(`Prompt: ${prompt}`);

     await xReact(m, ['🆗', '❌']);

     const reactionFilter = (reaction, user) => user.id === m.author.id && ['🆗', '❌'].includes(reaction.emoji.name);
     const collected = await vorterx.awaitReactions(reactionFilter, { max: 1, time: 60000, errors: ['time'] });

     const reaction = collected.first();
     if (reaction.emoji.name === '🆗') {
      await vorterx.sendMessage(`Player ${m.author.username} accepted the promotion. Have fun😁`);
     } else {
      await vorterx.sendMessage(`Player ${m.author.username} declined the promotion. Game is over.`);
     }
     },
    };
