/*

     CREATED BY DIEGOSON FENANDEZ
     
*/
     
module.exports = {
  name: "number-guessing",
  description: "This is a number guessing game",
  category: "games",
  async xstart(vorterx, m, { xReact, args,text }) {
  
    if (args[0] === "start-number-guessing") {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      let timeout = false;

      if (!args[1]) {
        await xReact("⛔");
        await m.reply("⚠️ Please provide a number as your guess.");
        return;
      }

      const userGuess = parseInt(args[1]);

      if (isNaN(userGuess)) {
        await xReact("⛔");
        await m.reply("❌ Invalid guess, please provide a valid number.");
        return;
      }

      if (userGuess < 1 || userGuess > 10) {
        await xReact("🙂");
        await m.reply("❌ Your guess should be between 1 and 10.");
        return;
      }

      let message = "❌ Sorry, that's not the right number. Try again!";
      if (userGuess === randomNumber) {
        message = "🎉 Congrats! You guessed the correct number!";
      }

      const D3centX = `
        ┏━━━━━━━━━━━━━━━━━┓
        ┃   Number Guessing Game   ┃
        ┣━━━━━━━━━━━━━━━━━┫
        ┃   Your Guess: ${userGuess}   ┃
        ┃   Correct Number: ${randomNumber}   ┃
        ┣━━━━━━━━━━━━━━━━━┫
        ┃   ${message}   ┃
        ┗━━━━━━━━━━━━━━━━━┛
      `;

      await m.reply(D3centX);
    } else if (args[0] === "start-number-guessing-number") {
      await m.reply("✅ The game has started. Guess a number between 1 and 100.");
    } else if (args[0] === "quit-number-guessing") {
      await m.reply("ℹ️ You have quit the number guessing game bye.");
    } else {
      await m.reply("❌ Invalid command. Available commands: `start-number-guessing`, `start-number-guessing-number`, `quit-number-guessing`.");
    }

    const timeoutDuration = 60000;
    setTimeout(() => {
      if (!timeout) {
        timeout = true;
        m.reply("⌛️ Sorry, you ran out of time. The game has timed out bye.");
      }
    }, timeoutDuration);
   },
  };
