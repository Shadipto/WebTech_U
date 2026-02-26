console.log("------------------------------");
console.log("Mathematical Constants and Functions in JavaScript:");
const pi = Math.PI;

console.log(`Value of pi: ${pi}`);

let radius = 5;
let areaOfCircle = pi * radius * radius;

console.log(`Area of circle with radius ${radius}: ${areaOfCircle}`);

let circumferenceOfCircle = 2 * pi * radius;

console.log(
  `Circumference of circle with radius ${radius}: ${circumferenceOfCircle}`,
);

console.log(`Square root of 16: ${Math.sqrt(16)}`);
console.log(`Absolute value of -5: ${Math.abs(-5)}`);
console.log(`Value of e: ${Math.E}`);
console.log(`Value of Euler's number (e): ${Math.E}`);
console.log(`Value of natural logarithm of 10: ${Math.LN10}`);
console.log(`Value of natural logarithm of 2: ${Math.LN2}`);
console.log(`Value of log base 10 of e: ${Math.LOG10E}`);
console.log(`Value of log base 2 of e: ${Math.LOG2E}`);
console.log(`Value of maximum representable number: ${Number.MAX_VALUE}`);
console.log(`Value of minimum representable number: ${Number.MIN_VALUE}`);
console.log(`Value of positive infinity: ${Number.POSITIVE_INFINITY}`);
console.log(`Value of negative infinity: ${Number.NEGATIVE_INFINITY}`);

const randomNumber = Math.random();
console.log(`Random number between 0 and 1: ${randomNumber}`);

const randomInteger = Math.floor(Math.random() * 100) + 1;
console.log(`Random integer between 1 and 100: ${randomInteger}`);

const power = Math.pow(2, 3);
console.log(`2 raised to the power of 3: ${power}`);

const roundedValue = Math.round(4.7);
console.log(`Rounded value of 4.7: ${roundedValue}`);

const floorValue = Math.floor(4.7);
console.log(`Floor value of 4.7: ${floorValue}`);

const ceilValue = Math.ceil(4.3);
console.log(`Ceil value of 4.3: ${ceilValue}`);
