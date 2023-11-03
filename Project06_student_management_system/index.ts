class Person {
    name:string;
    age: number;

    constructor (name:string,age:number) {
        this.name = name;
        this.age = age;
    }

    getName() {
        return this.name;
    }
}
class Student extends Person {
    rollNumber:string;
    courses:Course[] = [];

    constructor(name:string,age:number,rollNumber:string) {
        super(name,age)
        this.rollNumber = rollNumber; 
    } 
    registerForCourses(course:Course) {
        this.courses.push(course);
    }   
}
class Instructor extends Person {
    private salary:number;
    courses:Course[] = [];

    constructor(name:string,age:number,salary:number) {
        super(name,age);
        this.salary = salary;
    }        
    assignCourse(course:Course) {
        this.courses.push(course);
    }
}
const student1 = new Student("Shahmir",25,"037");
const student2 = new Student("Danish",26,"021");
const instructor1 = new Instructor("Sufiyan",32,90000);
const instructor2 = new Instructor("Ali",32,100000);
// student1.registerForCourses("Javascript");
// console.log(student1.courses);
// console.log(student2);
// console.log(student2);
// console.log(instructor1);
// console.log(instructor2);
// instructor1.assignCourse("Javascript");
// instructor1.assignCourse("React");
// console.log(instructor1.courses);

class Course {
    id:string;
    name:string;
    students:Student[] = [];
    instructor!:Instructor;

    constructor(id:string,name:string,) {
        this.id = id;
        this.name = name;
    }
    addStudent(student:Student) {
        this.students.push(student);
        student.registerForCourses(this);
    }
    setInstructor(instructor:Instructor) {
        this.instructor = instructor;
        instructor.assignCourse(this);
    }
}
const course1 = new Course("JS1","Javascript");
course1.addStudent(student1);
course1.addStudent(student2);
course1.setInstructor(instructor1);
// console.log(course1.students[0]);
// console.log(student1.courses);
// console.log(course1.instructor);
const course2 = new Course("TS1","Typescript");

class Department {
    name:string;
    courses:Course[] = [];

    constructor(name:string) {
        this.name = name;
    }
    addCourses(course:Course) {
        this.courses.push(course);
    }
}

const department1 = new Department("Computer Science");
department1.addCourses(course1);
department1.addCourses(course2);
console.log(department1);
console.log(department1.courses);


