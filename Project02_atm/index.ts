import inquirer from "inquirer";

type userType = {
    name:string,
    pin:number,
    balance:number,
}
let user:userType = {
    name:"John Doe",
    pin: 1100,
    balance:90000,
}
console.log("Welcome to ATM Built using Typescript. There is a dummy user created John Doe having balance 90,000. The pin can be found at https://github.com/ShahmirZaman/PIAIC-Q1-TS-Node-Projects.git")
const answers = await inquirer.prompt([
    {
        message: "Please Enter Pin",
        name:"pin",
        type:"password",
    }
]);
// console.log("Answers: ",answers);
//Retry on incorrect pin
let continueTransaction:boolean = true;
if(Number(answers.pin) !== user.pin) {
    console.log("You have entered an incorrect pin!");
}
else {
    while(continueTransaction == true) {
    const response = await inquirer.prompt([
        {
            name:"selectedType",
            message:"Please select an option",
            type:"list",
            choices:["Withdraw","Fast Cash","Balance Inquiry"],
        },
        {
            name:"amount",
            message:"Please select amount",
            type:"list",
            choices:["500","1000","1500","2000","3000","5000","10000"],
            when(response) {
                return response.selectedType == "Fast Cash";
            }
        },
        //Amount should be multiple of 500
        {
            name:"amount",
            message:"Please enter amount",
            when(response) {
                return response.selectedType == "Withdraw";            }
        }
    ]);
//    console.log("Selected Type: ",response);
// Do you want to try another transaction
if(response.selectedType == "Balance Inquiry") {
    console.log(`Your balance is: ${user.balance}`);
    const toRepeat =  await inquirer.prompt([
        {
            name:"repeat",
            type:"confirm",
            message:"Do you want to try another transaction",
        }
    ]);
    if(toRepeat.repeat == true)
    continueTransaction = true;
        else {
           continueTransaction = false; 
        }
} else {
    user.balance = user.balance - response.amount; 
    console.log(`Your new balance is: ${user.balance}`);
    continueTransaction = false;
}
}
}