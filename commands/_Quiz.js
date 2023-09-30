//=============

// MADE BY DIEGOSON FENANDES 

//=============

module.exports = {
  name: 'quiz',
  description: 'For playing Quiz game while being bored',
  category: 'games',
  async xstart(vorterx, m, { xReact, args, text }) {
    await xReact('🆎️');
    
    const quizGame = {
      currentQuestionIndex: 0,
      currentPlayerIndex: 0,
      players: [],
      scores: [],
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Paris", "London", "Berlin", "Madrid"],
          answer: 0
        },
        {
          question: "Who painted the Mona Lisa?",
          options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
          answer: 0
        },
        {
          question: "Who made the Aztec WhatsApp bot?",
          options: ["Tshephang Masia", "Viper X0", "Ahmmi Kun", "Vorterx Team", "Diegoson Fenandez"],
          answer: 0
        },
        {
          question: "Who is the main character on Dragon Ball?",
          options: ["Tom Harland", "Lionel Messi", "Cristiano Ronaldo", "Sean Schemmel"],
          answer: 0
        },
        {
          question: "Who wrote the novel 'Pride and Prejudice'?",
          options: ["Jane Austen", "Charles Dickens", "Mark Twain", "Emily Bronte"],
          answer: 0
        },
        {
          question: "What is the largest planet in our solar system?",
          options: ["Jupiter", "Saturn", "Neptune", "Mars"],
          answer: 0
         }
       ],

       displayQuestion: function () {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        vorterx.send(`Question: ${currentQuestion.question}`);
        vorterx.send(`Options: ${currentQuestion.options.join(", ")}`);
       },

        checkAnswer: function (playerAnswer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (playerAnswer === currentQuestion.answer) {
          vorterx.send("Correct answer!");
          this.scores[this.currentPlayerIndex]++;
        } else {
          vorterx.send("Incorrect answer. Try again!");
        }
        vorterx.send(`${this.players[this.currentPlayerIndex]}'s Score: ${this.scores[this.currentPlayerIndex]}`);
       },

        nextTurn: function () {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        if (this.currentPlayerIndex === 0) {
          this.currentQuestionIndex++;
        }

        if (this.currentQuestionIndex < this.questions.length) {
          this.displayQuestion();
        } else {
          this.endGame();
        }
      },

       endGame: function () {
        vorterx.send("Game is over!");
        vorterx.send("Final scores for the quiz:");
        for (let i = 0; i < this.players.length; i++) {
          vorterx.send(`${this.players[i]}: ${this.scores[i]}`);
        }
      },

      play: function () {
        vorterx.send("🆎️ Welcome to the Quiz Game! Let's start!");
        this.displayQuestion();
      }
    };

    const playerNames = args.slice(1);
    quizGame.players = playerNames;
    quizGame.scores = Array(playerNames.length).fill(0);

    quizGame.play();

     const filter = (response) => {
      return response.author.id === m.author.id;
    };

    const collector = m.channel.createMessageCollector(filter, { time: 60000 });

     collector.on('collect', (response) => {
      const playerAnswer = parseInt(response.content);
      quizGame.checkAnswer(playerAnswer);
      quizGame.nextTurn();
     });

      collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        vorterx.send("Time's up! The game has ended.");
        quizGame.endGame();
      }
      });
      },
    };
