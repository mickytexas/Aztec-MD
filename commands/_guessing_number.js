module.exports = {
  name: "number-guessing",
  description: 'This a number guessing game',
  category: "games",
  async xstart(vorterx, m, { xReact, args }) {

     const randomNumber = Math.floor(Math.random() * 100) + 1;

     if (!args[0]) { {await xReact(⛔');
      await m.reply("⚠️ Please provide a number as your guess.");
      return;
       }
      }       

      const userGuess = parseInt(args[0]);

      if (isNaN(userGuess)) { { await xReact('⛔');
      await m.reply("❌ Invalid guess, please provide a valid number.");
      return;
      }
     }

      if (userGuess < 1 || userGuess > 10) { {await xReact('🙂');
      await m.reply("❌ Your guess should be between 1 and 10.");
      return;
     }
    }

    if (userGuess === randomNumber) { await xReact('✔️');
      await m.reply("🎉 Congrats! You guessed the correct number!");
     } else {
      await m.reply("❌ Sorry, that's not the right number. Try again!");
      await m.reply(`🔍 The correct number was ${randomNumber}.`);
    }
    },
   };
