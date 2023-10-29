import inquirer from 'inquirer';

//todos array
//functions
//operations

let todos: string[] = [];

async function createTodo(arr:string[]) {

do{
    let answers = await inquirer.prompt([
        {
           type:"list",
           message: "Select an operation",
           name:"select",
           choices:["Add","Update","View","Delete"],
        }
    ])
    // console.log(answers);
    if(answers.select == "Add") {
        let addTodo = await inquirer.prompt([
            {
                type:"input",
                message:"Add Todo's item...",
                name:"todo",
            },
        ]);
        todos.push(addTodo.todo);
        console.log(todos);
    }
    if(answers.select == "Update") {
        let updateTodo = await inquirer.prompt([
            {
                type:"list",
                message:"Select item for update",
                choices:todos.map(item => item),
                name:"todo",
            }
        ]);
        let addTodo = await inquirer.prompt([
            {
                type:"input",
                message:"Add Todo's item...",
                name:"todo",
            },
        ]);
        let newTodos = todos.filter(val => val !== updateTodo.todo);
        todos = [...newTodos,addTodo.todo];
        console.log(todos);
    }
    if(answers.select == "View") {
        console.log(todos);
    }
    if(answers.select == "Delete") {
        let deleteTodo = await inquirer.prompt([
            {
                type:"list",
                message:"Select item for update",
                choices:todos.map(item => item),
                name:"todo",
            }
        ]);
        let newDelTodos = todos.filter(value => value !== deleteTodo.todo);
        todos = [...newDelTodos];
        console.log(todos);
    }
} while(true)
    
}

createTodo(todos);