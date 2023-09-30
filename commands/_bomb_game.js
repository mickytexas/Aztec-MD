//=======

// MADE BYDIEGOSON 

//======

module.exports = {
  name: 'bomb',
  description: 'A simple bomb game to enjoy',
  category: 'games',
  async xstart(vorterx, m, { xReact,args,text }) {
    await xReact('💣');

    const bombGame = {
      currentPlayerIndex: 0,
      players: [],
      maxPoints: 3,
      scores: [],
      bombs: [],
      activeBomb: null,

      startGame() {
        vorterx.send('```\n' +
          '  _______\n' +
          ' /       \\\n' +
          '|   💣   |\n' +
          ' \\_______/\n' +
          '```');
        vorterx.send('💣 Bomb game started! Type `defuse` to defuse the bomb.');
        this.currentPlayerIndex = 0;
        this.scores = Array(this.players.length).fill(0);
        this.generateBombs();
        this.startRound();
       },

       generateBombs() {
        this.bombs = [];
        for (let i = 0; i < this.maxPoints; i++) {
          const timer = Math.floor(Math.random() * 10) + 1;
          this.bombs.push({ timer });
        }
       },

        startRound() {
        if (this.currentPlayerIndex === 0) {
          vorterx.send(```\n💣 Round ${this.scores.reduce((sum, score) => sum + score, 0) + 1}\n\n` +
            '  _______\n' +
            ' /       \\\n' +
            '|   💣   |\n' +
            ' \\_______/\n' +
            '```');
          vorterx.send(`💣 Bomb Timer: ${this.bombs[this.scores.reduce((sum, score) => sum + score, 0)].timer} seconds`);
        }

        const currentPlayer = this.players[this.currentPlayerIndex];
        vorterx.send(`💣 It's ${currentPlayer}'s turn. Type \`defuse\` to defuse the bomb!`);

        const bomb = this.bombs[this.scores.reduce((sum, score) => sum + score, 0)];
        this.activeBomb = setTimeout(() => {
          vorterx.send(`💥 Boom! The bomb exploded. ${currentPlayer} failed to defuse it.`);
          vorterx.send('```\n' +
            '  _______\n' +
            ' /       \\\n' +
            '|   💥   |\n' +
            ' \\_______/\n' +
            '```');
          this.nextTurn();
        }, bomb.timer * 1000);
       },

       defuseBomb() {
        if (this.activeBomb) {
          clearTimeout(this.activeBomb);
          const currentPlayer = this.players[this.currentPlayerIndex];
          vorterx.send(`✅ ${currentPlayer} successfully defused the bomb! (+1 point)`);
          this.scores[this.currentPlayerIndex]++;
          this.nextTurn();
         }
       },
 
       nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        if (this.scores.reduce((sum, score) => sum + score, 0) === this.maxPoints) {
          this.endGame();
        } else {
          this.startRound();
         }
      },

        endGame() {
        vorterx.send('```\n💣 Game over! Final scores:\n\n');
        for (let i = 0; i < this.players.length; i++) {
          vorterx.send(`${this.players[i]}: ${this.scores[i]} points`);
        }
        vorterx.send('```');
      }
     };

    const playerNames = args.slice(1);
    bombGame.players = playerNames;
    bombGame.scores = Array(playerNames.length).fill(0);

    bombGame.startGame();

    const filter = (response) => {
      return response.author.id === m.author.id && response.content.toLowerCase() === 'defuse';
    };

    const collector = m.channel.createMessageCollector(filter);

    collector.on('collect', (response) => {
      bombGame.defuseBomb();
      collector.stop();
    });
   },
 };
