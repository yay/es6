const literalObj = Object.create({});
const nullObj = Object.create(null);

console.log(typeof literalObj); // object
console.log(typeof nullObj);    // object

console.log(literalObj instanceof Object); // true
console.log(nullObj instanceof Object);    // false

console.log(literalObj.hasOwnProperty); // [Function: hasOwnProperty]
console.log(nullObj.hasOwnProperty);    // undefined

console.log(literalObj.constructor); // [Function: Object]
console.log(nullObj.constructor);    // undefined
