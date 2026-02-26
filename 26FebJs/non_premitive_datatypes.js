console.log("------------------------------");

console.log("Non-Primitive Data Types in JavaScript:");

// array

let numbers = [1, 2, 3, 4, 5];
console.log(`Value of numbers: ${numbers}`);
console.log(`Datatype of numbers: ${typeof numbers}`); // typeof an array returns "object"

// object

let person = {
  name: "Shadipto",
  age: 22,
  isStudent: true,
};
console.log(`Value of person: ${JSON.stringify(person)}`);
console.log(`Datatype of person: ${typeof person}`); // typeof an object returns "object"

// function

function greet() {
  return "Hello!";
}
console.log(`Value of greet function: ${greet()}`);
console.log(`Datatype of greet function: ${typeof greet}`); // typeof a function returns "function"

// date

let currentDate = new Date();
console.log(`Value of currentDate: ${currentDate}`);
console.log(`Datatype of currentDate: ${typeof currentDate}`); // typeof a date returns "object"

// regular expression [regex]

let regex = /hello/i;
console.log(`Value of regex: ${regex}`);
console.log(`Datatype of regex: ${typeof regex}`); // typeof a regular expression returns "object"
