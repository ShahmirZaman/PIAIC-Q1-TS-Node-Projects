import inquirer from 'inquirer';
class Student {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
// console.log(persons);
const programStart = async (persons) => {
    do {
        console.log("Welcome Guest");
        const answer = await inquirer.prompt([
            {
                type: "list",
                message: "Whom you want to talk?",
                name: "select",
                choices: ["Self", "Student"]
            }
        ]);
        if (answer.select == "Self") {
            console.log("Hello, i am talking with myself");
            console.log("My health is good");
        }
        if (answer.select == "Student") {
            const ans = await inquirer.prompt([
                {
                    type: "input",
                    message: "To which student you want to talk?",
                    name: "student",
                },
            ]);
            const std = persons.students.find(val => val.name == ans.student);
            if (!std) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`Hello I am ${name.name} and i am fine`);
                console.log(persons.students);
            }
            if (std) {
                console.log(`Hello I am ${std.name} and i am fine....`);
                console.log(persons.students);
            }
        }
    } while (true);
};
programStart(persons);
