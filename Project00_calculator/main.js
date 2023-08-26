import inquirer from "inquirer";
const answers = await inquirer.prompt([
    {
        type: "number",
        name: "num1",
        message: "Enter your first number: "
    },
    {
        type: "number",
        name: "num2",
        message: "Enter your second number: "
    },
    {
        type: "list",
        name: "operator",
        choices: ["Addition", "Subtraction", "Multiplication", "Division"],
        message: "Which operation do you want to perform?"
    }
]);
// console.log(answers);
const { num1, num2, operator } = answers;
if (num1 && num2 && operator) {
    let result = 0;
    if (operator === "Addition") {
        result = num1 + num2;
    }
    else if (operator === "Subtraction") {
        result = num1 - num2;
    }
    else if (operator === "Multiplication") {
        result = num1 * num2;
    }
    else if (operator === "Division") {
        result = num1 / num2;
    }
    console.log(`${operator} of ${num1} and ${num2} is: `, result);
}
else {
    console.log("Kindly enter valid input");
}
;
