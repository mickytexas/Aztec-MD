     //MADE BY DIEGOSON 

    //@AZTEC MD

    //TRUTH_0R_DARE_FUNCTION

   const vorterx_truth_questions = [
  "What is the most embarrassing thing you've ever done in public?",
  "Have you ever had a secret talent that no one knows about?",
  "What is the most adventurous activity you'd like to try?",
  "If you could trade lives with someone for a day, who would it be and why?",
  "What is the most embarrassing thing you've ever said to a crush?",
  "Have you ever had a paranormal experience?",
  "What is the strangest dream you've ever had?",
  "What is your biggest guilty pleasure?",
  "If you could time travel, which era would you visit and why?",
  "What is the one thing you would change about yourself if you could?",
  "Have you ever had a crush on a fictional character? If so, who?",
  "What is the most embarrassing fashion trend you've ever followed?",
  "What is your most irrational fear?",
  "If you could have one superpower, what would it be and how would you use it?",
  "Have you ever lied to get out of trouble? What was the situation?",
  "What is the most embarrassing text message you've sent to the wrong person?",
  "What is the weirdest food combination you've ever tried and enjoyed?",
  "Have you ever had a near-death experience?",
  "What is the most embarrassing nickname you've ever had?",
  "If you could be invisible for a day, what would you do?",
  ];

   const vorterx_dare_tasks = [
  "Do your best impression of a celebrity and have everyone guess who you are.",
  "Act out a famous movie scene using only gestures and no words.",
  "Do a silly dance in the middle of a crowded room.",
  "Call a random number and have a conversation pretending to be a famous person.",
  "Sing a song with your mouth full of water without spilling it.",
  "Go outside and shout 'I love [insert random object or food]' as loud as you can.",
  "Eat a spoonful of a condiment that you dislike.",
  "Wear your socks on your hands for the rest of the game.",
  "Do a handstand against a wall for as long as you can.",
  "Compose and perform a short rap about another player.",
  "Put an ice cube down your shirt and leave it there until it melts.",
  "Do a cartwheel or a somersault in the middle of the room.",
  "Try to lick your elbow (it's impossible, but give it a try!).",
  "Do a plank for as long as you can hold it.",
  "Speak in a foreign accent for the next three rounds.",
  "Make up a story by adding one sentence at a time with each player taking turns.",
  "Do a blindfolded taste test and guess the food or drink you're tasting.",
  "Give a 2-minute stand-up comedy routine without laughing.",
  "Spin around in circles 10 times and then try to walk in a straight line.",
  "Text your crush and ask them a random question without any context.",
  ];

  function vorterx_truth() {
  const question = vorterx_truth_questions[Math.floor(Math.random() * vorterx_truth_questions.length)];
  return question;
   }

  function vorterx_dare() {
  const dare = vorterx_dare_tasks[Math.floor(Math.random() * vorterx_dare_tasks.length)];
  return dare;
  }

  module.exports = {
  vorterx_truth,
  vorterx_dare
  }
