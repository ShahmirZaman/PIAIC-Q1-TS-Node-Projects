import inquirer from 'inquirer';
import chalk from 'chalk';

let apilink:string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
let fetchData =async (data:string) => {
    let fetchQuiz:any = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results;
};

let quizData = await fetchData(apilink);

let startQuiz =async () => {
    let score:number = 0;
    //For user name
    let userName = await inquirer.prompt([
        {
            type:"input",
            name:"username",
            message:chalk.bold.green.italic("Enter your name?"),
        }
    ]);
    for(let i = 1; i < 5; i++) {
        let answers = [...quizData[i].incorrect_answers,quizData[i].correct_answer];
        let ans = await inquirer.prompt([
            {
                type:"list",
                name:"quiz",
                message:chalk.bold.italic.greenBright(quizData[i].question),
                choices:answers.map((value:any) => value),
            }
        ]);
        if(ans.quiz == quizData[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blueBright(`Correct`));
        } else {
            console.log(`Correct Answer is ${chalk.bold.italic.redBright(quizData[i].correct_answer)}`);
        }

    }
    console.log(`Dear ${chalk.blue.bold(userName.username)}, your score is ${chalk.bold.red(score)} out of ${chalk.bold.red("4")}`);
}

startQuiz();