{
    // Binary and Octal literals
    console.log(0b111110111 === 503); // true
    console.log(0o767 === 503);       // true
}

{
    // Represents the difference between 1
    // and the smallest floating point number greater than 1.
    console.log(Number.EPSILON); // 2.220446049250313e-16

    let x = 0.2;
    let y = 0.3;
    let z = 0.1;
    // x - y + z = 2.7755575615628914e-17
    let equal = (Math.abs(x - y + z) < Number.EPSILON);
    console.log(equal); // true

    console.log(Number.isInteger(Infinity)); // false
    console.log(Number.isNaN(0o767));        // false
}

{
    console.log(
        Math.acosh(3),    // 1.762747174039086
        Math.hypot(3, 4), // 5
        Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2)  // 2
    );
}

{
    console.log(
        "abcde".includes("cd"), // true
        "abc".repeat(3)         // "abcabcabc"
    )
}

{
    // Array.from(document.querySelectorAll('*')); // Returns a real Array

    console.log(
        Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
    );

    console.log(
        // 'fill' fills all the elements of an array from a start index
        // to an end index with a static value:
        // arr.fill(value, startIndex, endIndex)
        [0, 0, 0].fill(7),                 // [7,7,7]
        [0, 0, 0].fill(7, 1),              // [0,7,7]
        [0, 0, 0].fill(7, 1, 2),           // [0,7,0]
        // 'find' returns the value of the first element in the array
        // that satisfies the provided testing function
        [1, 2, 4, 5].find(x => x > 3),     // 4
        [1, 2, 3].findIndex(x => x === 2), // 1
        // 'copyWithin' shallow copies part of an array to another location
        // in the same array and returns it, without modifying its size:
        // arr.copyWithin(targetIndex, startIndex, startIndex)
        [1, 2, 3, 4, 5].copyWithin(3, 0),  // [1, 2, 3, 1, 2]
        // ["a", "b", "c"].values() // iterator "a", "b", "c"
        // TypeError: ["a","b","c"].values is not a function in Chrome 61 and Node 8.6
    );

    // iterator [0, "a"], [1,"b"], [2,"c"]
    for (let entry of ["a", "b", "c"].entries()) {
        console.log(entry);
    }

    // iterator 0, 1, 2
    for (let key of ["a", "b", "c"].keys()) {
        console.log(key);
    }
}

{
    // The Object.assign() method is used to copy the values of all
    // enumerable own properties from one or more source objects
    // to a target object. It will return the target object.
    //
    //     Object.assign(target, ...sources)

    let proto = {
        b: 'hi'
    };
    let child = Object.create(proto);
    child.c = { d: 'howdy' };

    let obj = {
        b: 'hello'
    };

    Object.assign(obj, {a: 'hey'}, child);

    console.log(obj); // { b: 'hello', a: 'hey', c: { d: 'howdy' } }
}

/*

function factorial(n, acc = 1) {
    // Uncaught SyntaxError: Illegal 'use strict' directive
    // in function with non-simple parameter list
    'use strict';
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES6.
factorial(100000); // Still throws in Chrome 61 and Node 8.6

 */