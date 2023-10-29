import inquirer from "inquirer";
import chalk from "chalk";
// Currency Converter API Link
let apiLink = " https://v6.exchangerate-api.com/v6/3af6b5485c408e1461974c88/latest/PKR";
//Fetching Data From API
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
let api = await fetchData(apiLink);
//Object to array
let countries = Object.keys(api);
//Converting From First Country Currency
let firstCountry = await inquirer.prompt([
    {
        type: "list",
        name: "country1",
        message: "Converting From ",
        choices: countries,
    }
]);
// console.log(`Converting from ${chalk.greenBright.bold(firstCountry.country1)}`);
//Ask User About the amount
let userMoney = await inquirer.prompt([
    {
        type: "number",
        name: "money",
        message: `Please enter the amount in ${chalk.greenBright.bold(firstCountry.country1)}`,
    }
]);
// console.log(userMoney.money);
//Converting To Second Country Currency
let secondCountry = await inquirer.prompt([
    {
        type: "list",
        name: "country2",
        message: "Converting To ",
        choices: countries,
    }
]);
//Conversion Rate
let conversionRate = `https://v6.exchangerate-api.com/v6/3af6b5485c408e1461974c88/pair/${firstCountry.country1}/${secondCountry.country2}`;
// console.log(conversionRate);
//fetching data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let cnvResponse = await cnvData.json();
    return cnvResponse.conversion_rate;
};
let conversionData = await cnvData(conversionRate);
let convertedRate = userMoney.money * conversionData;
console.log(`Your ${chalk.bold.greenBright(firstCountry.country1)} ${chalk.bold.greenBright(userMoney.money)} in ${chalk.bold.greenBright(secondCountry.country2)} is ${chalk.bold.greenBright(convertedRate.toFixed(2))}`);
