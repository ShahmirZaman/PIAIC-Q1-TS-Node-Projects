import inquirer from 'inquirer';

function counter(paragraph:string) {
    let freeWhiteSpace = paragraph.replace(/\s/g,"");
    return freeWhiteSpace.length;
}   

async function wordCounter(counter:(text:string) => number) {
    do {
        let response = await inquirer.prompt([
            {
                type:"input",
                message:"write paragraph here....",
                name:"paragraph",
            }
        ]);
        console.log(counter(response.paragraph));
    }
    while(true)
}
wordCounter(counter);