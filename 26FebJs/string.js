console.log("-------------------------------");
console.log("String Data Type in JavaScript:");

let firstName = "Shadipto";
let lastName = "Pranto";
let fullName = firstName + " " + lastName;

console.log(`First Name: ${firstName}`);
console.log(`Last Name: ${lastName}`);
console.log(`Full Name: ${fullName}`);

let greeting = `Hello, my name is ${fullName}.`;
console.log(greeting);

let multiLineString = `This is a multi-line string.
It can span multiple lines without using escape characters.`;
console.log(multiLineString);

let escapedString =
  "This is a string with a newline character.\nAnd this is on a new line.";
console.log(escapedString);

let quoteString = 'She said, "JavaScript is awesome!"';
console.log(quoteString);

let backslashString = "This string contains a backslash: \\";
console.log(backslashString);

let unicodeString = "This string contains a Unicode character: \u2764";
console.log(unicodeString);

let stringLength = fullName.length;
console.log(`Length of fullName: ${stringLength}`);

let upperCaseName = fullName.toUpperCase();
console.log(`Full Name in uppercase: ${upperCaseName}`);

let lowerCaseName = fullName.toLowerCase();
console.log(`Full Name in lowercase: ${lowerCaseName}`);

let indexOfSpace = fullName.indexOf(" ");
console.log(`Index of space in fullName: ${indexOfSpace}`);

let substring = fullName.substring(0, 7);
console.log(`Substring of fullName from index 0 to 7: ${substring}`);

let replacedString = fullName.replace("Shadipto", "John");
console.log(`Full Name after replacement: ${replacedString}`);

let includesSubstring = fullName.includes("Pranto");
console.log(`Does fullName include "Pranto"? ${includesSubstring}`);

let splitString = fullName.split(" ");
console.log(`Full Name split into an array: ${splitString}`);

let trimmedString = "   Hello World!   ".trim();
console.log(`Trimmed string: '${trimmedString}'`);

// long literal string
let longString =
  "This is a very long string that spans multiple lines. " +
  "It is created using string concatenation with the + operator. " +
  "This allows us to write long strings without using template literals.";
console.log(longString);

// Escape Sequences in Strings \n for new line, \t for tab, \\ for backslash, \' for single quote, \" for double quote

let aa =
  "This is a string with a newline character.\nAnd this is on a new line.";
console.log(aa);

let bb = "This is a string with a tab character.\tAnd this is after the tab.";
console.log(bb);

let cc = "This string contains a backslash: \\";
console.log(cc);

let dd = 'She said, "JavaScript is awesome!"';
console.log(dd);

let ee = "It\'s a nice day!";
console.log(ee);

let ff = 'This string contains a double quote: "Hello!"';
console.log(ff);
