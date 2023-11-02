import inquirer from 'inquirer';
import chalk from 'chalk';
import { differenceInSeconds } from 'date-fns';
const response = await inquirer.prompt([
    {
        type: "number",
        name: "userInput",
        message: "Please enter the amount of second",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter valid number";
            }
            else if (input > 60) {
                return "Seconds must be in 60";
            }
            else {
                return true;
            }
        }
    }
]);
let input = response.userInput;
function startTime(val) {
    const intialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervaltime = new Date(intialTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervaltime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.redBright(`Timer has expired`));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.bold.greenBright(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`));
    }), 1000);
}
;
startTime(input);
