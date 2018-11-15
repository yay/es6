// Symbol value
//     primitive value that represents a unique, non-String Object property key
// Symbol type
//     set of all possible Symbol values
// Symbol object
//     member of the Object type that is an instance of the standard
//     built-in Symbol constructor

// Each possible Symbol value is immutable and holds an associated value
// called [[Description]] that is either undefined or a String value.

// Well-known Symbols:
// https://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols

function Point(x, y) {
    this.x = x;
    this.y = y;
}

{
    const p = new Point(1, 2);
    // Point[Symbol.hasInstance] is a function that is called by the semantics
    // of the instanceof operator.
    p instanceof Point;                        // true
    Point[Symbol.hasInstance](p);              // true
    Point[Symbol.hasInstance]( {x: 1, y: 2} ); // false
}
//-----------------------------------------------------------------------------
{
    // The value of the Symbol.iterator property is the default Iterator
    // for an object.
    // Called by the semantics of the for-of statement.
    typeof {}[Symbol.iterator]; // "undefined"
    typeof [][Symbol.iterator]; // "function"
}
//-----------------------------------------------------------------------------
{
    const re = RegExp('abc');
    const str = 'asdfabcdf';

    str.match(re);         // ["abc", index: 4, input: "asdfabcdf", groups: undefined]
    // String.prototype.match does this:
    re[Symbol.match](str); // ["abc", index: 4, input: "asdfabcdf", groups: undefined]

    // There's also: Symbol.replace, Symbol.search
}
//-----------------------------------------------------------------------------
{
    class MyArray extends Array {
        static get [Symbol.species]() { return Array; }
    }
    const a = new MyArray(1, 2, 3);
    const mapped = a.map(x => x * x);
    // Array prototype methods (like 'map') normally use their 'this' object’s constructor
    // to create a derived object. However, a subclass constructor may over-ride
    // that default behaviour by redefining its Symbol.species property - a function
    // valued property that is the constructor function that is used to create
    // derived objects.

    mapped instanceof MyArray; // false
    mapped instanceof Array;   // true
}
//-----------------------------------------------------------------------------
{
    const obj = {
        // Type(hint) is String and its value is either "string" or "number".
        [Symbol.toPrimitive](hint) {
            if (hint === 'number') {
                return 42;
            }
            return 'Hello';
        }
    };
    console.log(obj);      // {Symbol(Symbol.toPrimitive): ƒ}
    console.log(+obj);     // 42
    console.log(obj + ''); // Hello
}
//-----------------------------------------------------------------------------
{
    // Symbol.toStringTag - a String valued property that is used in the creation
    // of the default string description of an object.
    class ValidatorClass {
        get [Symbol.toStringTag]() {
            return 'Validator';
        }
    }
    console.log((new ValidatorClass()).toString()); // [object Validator]
}
//-----------------------------------------------------------------------------

console.log(Symbol('foo') === Symbol('foo')); // false

{
    console.log(new Number(5));      // [Number: 5]
    console.log(new Object());       // {}
    console.log(new String('hey'));  // [String: 'hey']
    console.log(new Array(1, 2, 3)); // [ 1, 2, 3 ]
    // console.log(new Symbol());       // TypeError: Symbol is not a constructor
    // Symbol is not a namespace like Math, nor constructor, just a regular function.
    console.log( Object(Symbol()) ); // the right way to create symbol wrapper object
}

const symbol = Symbol();
typeof symbol; // 'symbol' - new primitive data type in ES6

let namedSymbol = Symbol('London'); // named symbol

// Since all symbols are unique:
Symbol() === Symbol(); // false

let obj = {
    a: 'hey',
    b: 'hi',
    [symbol]: 'hello',
    [namedSymbol]: 'howdy'
};

console.log(Object.keys(obj));                  // [ 'a', 'b' ]
console.log(Object.getOwnPropertyNames(obj));   // [ 'a', 'b' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(), Symbol(London) ]