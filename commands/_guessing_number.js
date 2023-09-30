//  @MADE BY @DIEGOSON 

//  @AZTEC MD WABOT

//  @ENJOY  GAMING BOT

module.exports = {
  name: "number-guessing",
  description: "This is a number guessing game",
  category: "games",
  async xstart(vorterx, m, { xReact, args, text }) {
   
      if (args[0] === "start-number-guessing") {
      let player1 = m.author;
      let player2 = null;

       if (!m.mentions.users.first()) {
        await xReact("⛔");
        await m.reply("⚠️ Please tag another user to play the game with.");
        return;
       }

       player2 = m.mentions.users.first();
       await m.reply(`${player2}, ${player1} wants to play number guessing game with you! Please reply with \`!join\` to join.`);

       const filter = (response) =>
        response.content.toLowerCase() === "!join" &&
        response.author.id === player2.id;
       const collector = m.channel.createMessageCollector(filter, {
        time: 60000,
        max: 1,     
      });

       collector.on("collect", async (joinedMessage) => {
         const randomNumber = Math.floor(Math.random() * 100) + 1;

         const player1Guess = Math.floor(Math.random() * 100) + 1;
         let player2Guess = null;

         let message = "Nobody guessed the correct number!";

         await m.reply(`✅ It's now your turn, ${player2}. Please reply with your guess (a number between 1 and 100) within 60 seconds.`);

         const guessCollector = m.channel.createMessageCollector(
          (response) => response.author.id === player2.id,
          { time: 60000, max: 1 }
         );

         guessCollector.on("collect", (guessMessage) => {
           player2Guess = parseInt(guessMessage.content);

            if (player2Guess !== NaN && player2Guess >= 1 && player2Guess <= 100) {
            guessCollector.stop();
            if (player1Guess === randomNumber && player2Guess === randomNumber) {
              message = `🎉 Congrats! Both ${player1} and ${player2} guessed the correct number!`;
            } else if (player1Guess === randomNumber) {
              message = `🎉 Congrats! ${player1} guessed the correct number!`;
            } else if (player2Guess === randomNumber) {
              message = `🎉 Congrats! ${player2} guessed the correct number!`;
            }

            const D3centX = `┏━━━━━━━━━━━━━━━━━┓
        ┃   Number Guessing Game   ┃
        ┣━━━━━━━━━━━━━━━━━┫
        ┃   ${player1}'s Guess: ${player1Guess}   ┃
        ┃   ${player2}'s Guess: ${player2Guess}   ┃
        ┃   Correct Number: ${randomNumber}   ┃
        ┣━━━━━━━━━━━━━━━━━┫
        ┃   ${message}   ┃
        ┗━━━━━━━━━━━━━━━━━┛`;

           m.reply(D3centX);
          }
        });

         guessCollector.on("end", (collected) => {
          if (collected.size === 0) {
          m.reply(`⌛️ ${player2} did not provide a guess in time. The game has timed out.`);
         }
        });
      });

      collector.on("end", (collected) => {
      if (collected.size === 0) {
      m.reply(`⌛️ ${player2} did not join the game. The game has timed out.`);
      }
      });
    } else if (args[0] === "start-number-guessing-number") {
      await m.reply("✅ The game will start once you tag another user to play with you.");
    } else if (args[0] === "quit-number-guessing") {
      await m.reply("ℹ️ You have quit the number guessing game. Goodbye!");
    } else {
      await m.reply("❌ Invalid command. Available commands: `start-number-guessing`, `start-number-guessing-number`, `join`, `quit-number-guessing`.");
    }
   },
  }; 
