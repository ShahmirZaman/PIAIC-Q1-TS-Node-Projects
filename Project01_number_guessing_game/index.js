import inquirer from "inquirer";
console.log("Game: Let's guess a number between 1 to 10 in 3 tries");
let actualAnswer = Math.floor(Math.random() * 10 + 1);
let numTries = 3;
let play = true;
while (play) {
    while (numTries > 0) {
        const answers = await inquirer.prompt([
            {
                name: "GuessNumber",
                message: "Enter number from 1 to 10: ",
                type: "number"
            },
        ]);
        // console.log(answers);
        if (answers.GuessNumber == actualAnswer) {
            console.log("Hurray!You guessed it right.Game ends");
            numTries = 0;
        }
        else {
            console.log("You guessed it wrong!");
            if (actualAnswer > answers.GuessNumber) {
                console.log("Think Higher");
            }
            else {
                console.log("Think Lower");
            }
            console.log(`You have ${numTries - 1} left`);
        }
        numTries--;
    }
    const playAgainAnswers = await inquirer.prompt([
        {
            name: "playAgain",
            message: "Do you want to play again?",
            type: "confirm"
        }
    ]);
    if (playAgainAnswers.playAgain == true) {
        numTries = 3;
        actualAnswer = Math.floor(Math.random() * 10 + 1);
    }
    else {
        console.log("Existing Game...");
        play = false;
    }
}
