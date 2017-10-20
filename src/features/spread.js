function f1(x, y = 12) {  // default parameters
    return x + y;
}
console.log( f1(3) ); // 15


// the 'arguments' object is not a real array,
// while rest parameters are Array

// the 'arguments' contains things like 'callee', 'caller'

(function hello() {
    console.log(arguments.callee); // [Function: hello]
    console.log(arguments.caller); // non-standard, don't use
})();

function f2(x, ...y) {  // rest parameters
    console.log(y);
    console.log(...y);  // spread
    return x * y.length;
}

console.log( f2(3, "hello", true) );
// [ 'hello', true ]
// hello true
// 6

// No parameter is allowed after rest parameter
// function f3(a, ...b, c) {  // error
//
// }

// destructuring rest parameters
function f3(...[a, b, c]) {
    return a + b + c;
}

console.log(
    f3(3, 4, 5, 6)  // 12
);

function f4(x, y, z) {
    return x + y + z;
}

console.log(
    f4(...[1, 2, 3])  // spread
);
// 6

// --- Spread syntax in array literals ---
{
    let iterableObj = [1, 2, 3];
    let arr = [...iterableObj, 4, 5, 6];
    console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]
}

{
    let str = '123';
    let arr = [...str, 4, 5, 6];
    console.log(arr); // [ '1', '2', '3', 4, 5, 6 ]
}

// --- Spread syntax in object literals (draft) ---
{
    let obj1 = {
        hi: 'hey',
        foo: 'bar'
    };
    let obj2 = {
        subObj: {
            my: 'prop'
        }
    };
    // Shallow-cloning (excluding prototype) or merging of objects
    // is now possible using a shorter syntax than Object.assign().
    // Object.assign() triggers setters whereas spread syntax doesn't.

    // Spread syntax only includes object's own properties.
    let objClone = { ...obj1, ...obj2, john: 'smith' };
    console.log(objClone);
    // { hi: 'hey', foo: 'bar', subObj: { my: 'prop' }, john: 'smith' }

    // The values of object properties like 'subObj' are not cloned.
    // Both 'objClone.subObj' and 'obj2.subObj' point at the same thing.
    objClone.subObj.my = 'o_O';
    console.log(obj2);
    // { subObj: { my: 'o_O' } }

    // let arr = [...obj]; // TypeError: obj is not iterable
}