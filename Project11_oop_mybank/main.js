import inquirer from 'inquirer';
import chalk from 'chalk';
import { faker } from '@faker-js/faker/locale/af_ZA';
//customer class
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobNumber;
    accNumber;
    constructor(firstName, lastName, age, gender, mob, acc) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobNumber = mob;
        this.accNumber = acc;
    }
}
// class Bank
class Bank {
    customer = [];
    account = [];
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    transaction(accobj) {
        let newAccounts = this.account.filter(acc => acc.accNumber !== accobj.accNumber);
        this.account = [...newAccounts, accobj];
    }
}
let mybank = new Bank();
//customer create
for (let i = 1; i <= 3; i++) {
    let fName = faker.person.firstName("male");
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number('3##########'));
    const cus = new Customer(fName, lName, 25 * i, "male", num, 1000 + i);
    mybank.addCustomer(cus);
    mybank.addAccountNumber({ accNumber: cus.accNumber, balance: 1000 * i });
}
//Bank functionality
async function bankService(bank) {
    do {
        let service = await inquirer.prompt([
            {
                type: "list",
                name: "select",
                message: "Please select the service",
                choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"],
            }
        ]);
        // View Balance
        if (service.select == "View Balance") {
            let res = await inquirer.prompt([
                {
                    type: "input",
                    name: "num",
                    message: "Please Enter Your Account Number:",
                }
            ]);
            let account = mybank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account) {
                let name = mybank.customer.find((item) => item.accNumber == account?.accNumber);
                console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} your Account Balance is ${chalk.bold.blueBright(`$${account.balance}`)} `);
            }
        }
        // Cash Withdraw
        if (service.select == "Cash Withdraw") {
            let res = await inquirer.prompt([
                {
                    type: "input",
                    name: "num",
                    message: "Please Enter Your Account Number:",
                }
            ]);
            let account = mybank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account) {
                let answer = await inquirer.prompt([
                    {
                        type: "number",
                        message: "Please Enter Your Amount:",
                        name: "amount",
                    },
                ]);
                if (answer.amount > account.balance) {
                    console.log(chalk.red.bold.italic("Insufficient Balance Amount!"));
                }
                let newBalance = account.balance - answer.amount;
                //Transaction Method
                mybank.transaction({ accNumber: account.accNumber, balance: newBalance });
            }
        }
        // Cash Deposit
        if (service.select == "Cash Deposit") {
            let res = await inquirer.prompt([
                {
                    type: "input",
                    name: "num",
                    message: "Please Enter Your Account Number:",
                }
            ]);
            let account = mybank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account) {
                let answer = await inquirer.prompt([
                    {
                        type: "number",
                        message: "Please Enter Your Amount:",
                        name: "amount",
                    },
                ]);
                let newBalance = account.balance + answer.amount;
                //Transaction Method
                mybank.transaction({ accNumber: account.accNumber, balance: newBalance });
            }
        }
        // Exit 
        if (service.select == "Exit") {
            return;
        }
    } while (true);
}
bankService(mybank);
