module.exports = {
  name: "Quiz Game",
  description: "A fun quiz game to test your knowledge",
  category: "games",
  async xstart(vorterx, m, { xReact, args }) {
    
    const quizQuestions = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin"],
        correctAnswer: "Paris",
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Neptune"],
        correctAnswer: "Jupiter",
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"],
        correctAnswer: "Leonardo da Vinci",
      },
    ];

    const createTable = () => {
      let table = "";

      quizQuestions.forEach((question, index) => {
        const options = question.options.map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`);
        const optionsString = options.join("\t");

        table += `${index + 1}.\t${question.question}\n${optionsString}\n\n`;
      });

      return table;
    };
    
    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    const displayQuestion = () => {
      const table = createTable();
      vorterx.sendMessage({ content: "Quiz Questions:\n\n" + table }, message.channel.id);
    };

    const checkAnswer = (selectedAnswer) => {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      if (selectedAnswer.toUpperCase() === currentQuestion.correctAnswer.toUpperCase()) {
        vorterx.sendMessage({ content: "Correct answer!" }, message.channel.id);
        correctAnswers++;
      } else {
        vorterx.sendMessage({ content: `Wrong answer! The correct answer is ${currentQuestion.correctAnswer}.` }, message.channel.id);
      }
    };
    
    vorterx.sendMessage({ content: "Welcome to the Quiz Game!" }, message.channel.id);

    while (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();

      const collectedMessage = await vorterx.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { channel: message.channel, max: 1, time: 60000, errors: ["time"] }
      );

      const selectedAnswer = collectedMessage.first().content;
      checkAnswer(selectedAnswer);

      currentQuestionIndex++;
    }

    vorterx.sendMessage({ content: `Quiz ended! You answered ${correctAnswers} out of ${quizQuestions.length} questions correctly.` }, message.channel.id);
  },
};
