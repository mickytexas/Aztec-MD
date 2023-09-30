const pointsSystem = require('../lib/pointsSystem.js');

module.exports = {
  name: 'connect-four',
  category: 'games',
  description: 'Connect Four game to play',
  players: [],

  async xstart(vorterx, m, { xReact, text, args }) {
    
     if (args[0] === 'start-connect-four') {
      if (this.players.length === 4) {
      await xReact('😁');
      vorterx.sendMessage('The game has already started!', m.channel.id);
      return;
      }

      const playerAlreadyJoined = this.players.find(player => player === m.author.username);
      if (playerAlreadyJoined) {
      vorterx.sendMessage("You've already joined the game!", m.channel.id);
      return;
      }
      
      this.players.push(m.author.username);
      const mentionMessage = `👋Hey @everyone, ${m.author.username} has started a Connect Four game! Type "join" to join.`;
      vorterx.sendMessage(mentionMessage, m.channel.id);
      return;
      }

      if (args[0] === 'quit') {
      const playerIndex = this.players.findIndex(player => player === m.author.username);
      if (playerIndex !== -1) {
      this.players.splice(playerIndex, 1);
       vorterx.sendMessage(`${m.author.username} has quit the game.`, m.channel.id);
      } else {
      vorterx.sendMessage("You're not part of the game!", m.channel.id);
      }
      return;
     }

      if (args[0] === 'join') {
      if (this.players.length === 4) {
      vorterx.sendMessage('The game has already started!', m.channel.id);
      return;
      }

      const playerAlreadyJoined = this.players.find(player => player === m.author.username);
      if (playerAlreadyJoined) {
      vorterx.sendMessage("You've already joined the game!", m.channel.id);
      return;
      }

     this.players.push(m.author.username); 
      
     const joinMessage = `${m.author.username} has joined the game!`;
     vorterx.sendMessage(joinMessage, m.channel.id);

    if (this.players.length === 4) {
     
    this.startGame(vorterx, m);
     }
    return;
     }

    const errorMessage = 'Invalid command! Usage: start-connect-four, join, quit';
    vorterx.sendMessage(errorMessage, m.channel.id);
    },

    async startGame(vorterx, m) {
    
    const gameStartMessage = '🎎Game started! Here we go...';
    vorterx.sendMessage(gameStartMessage, m.channel.id);

    this.players = [];

    const connectFourAztec = `
    -------------
    | 🟥 | 🔵 | 🟡 |
    -------------
    | 🟡 | 🟡 | 🟥 |
    -------------
    | 🔵 | 🟡 | 🟥 |
    -------------
    `;

    const winner = this.players[0];
    const points = 1000;
    pointsSystem.givePoints(winner, points);

    vorterx.sendMessage(`🎉Congratulations, ${winner}! You won the game and earned ${points} points🏅.`, m.channel.id);
    vorterx.sendMessage('🎎Let the Connect Four game begin!', m.channel.id);
    vorterx.sendMessage(connectFourAztec, m.channel.id);
  },
 };
