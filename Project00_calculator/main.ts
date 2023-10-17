#! /usr/bin/env node

import inquirer from "inquirer";
import { divide, multiply, subtract, sum } from "./functions.js";
import chalk from "chalk";

async function startCalculation() {
const answers: {
    num1: number,
    num2: number,
    operator: string,
} =  await inquirer.prompt([
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
        choices: ["Addition","Subtraction","Multiplication","Division"],
        message:"Which operation do you want to perform?"
    }
]);

const { num1,num2,operator} = answers;
if(num1 && num2 && operator) {
    let result:number = 0;
    if(operator === "Addition") {
        result = sum(num1,num2);
    } else if(operator === "Subtraction") {
        result = subtract(num1,num2);
    } else if(operator === "Multiplication") {
        result = multiply(num1,num2);
    } else if(operator === "Division") {
        result = divide(num1,num2);
    } 
    console.log(chalk.blue(`${operator} of ${num1} and ${num2} is: `,result));
}  else {
    console.log(chalk.black("Kindly enter valid input"));
};
}

async function startAgain() {
    do {
        await startCalculation();
        var again = await inquirer.prompt([
            {
                type:"input",
                name:"restart",
                message:"Do you want to continue? Press y or n: "
            }
        ])
    }while((again.restart === "y")||(again.restart === "yes")||(again.restart === "Y")||(again.restart === "YES"))
};

startAgain();

