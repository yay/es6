// Every symbol value returned from Symbol() is unique.
// A symbol value may be used as an identifier for object properties;
// this is the data type's only purpose.

console.log(Symbol('foo') === Symbol('foo')); // false

{
    console.log(new Number(5));      // [Number: 5]
    console.log(new Object());       // {}
    console.log(new String('hey'));  // [String: 'hey']
    console.log(new Array(1, 2, 3)); // [ 1, 2, 3 ]
    // console.log(new Symbol());       // TypeError: Symbol is not a constructor
    console.log( Object(Symbol()) ); // right way to create symbol wrapper object
}

let symbol = Symbol(); // new primitive data type
console.log(symbol);   // Symbol()
console.log(typeof symbol); // symbol

let namedSymbol = Symbol('London'); // named symbol
console.log(namedSymbol); // Symbol(London)

let obj = {
    a: 'hey',
    b: 'hi',
    [symbol]: 'hello',
    [namedSymbol]: 'howdy'
};

console.log(Object.keys(obj));                  // [ 'a' ]
console.log(Object.getOwnPropertyNames(obj));   // [ 'a' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(), Symbol(London) ]