const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      return resolve(answer);
    });
  });
};

module.exports = { askQuestion }