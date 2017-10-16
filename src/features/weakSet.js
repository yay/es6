/*
Syntax: new WeakSet([iterable]);

Methods: add, has, delete.

Just as with the WeakMap, it's impossible to check whether the object
has been removed from the Set once nothing has a reference to it,
because of the very fact that we can't refer to this object anymore to test.

*/

let ws = new WeakSet();
let a = {};
let b = {};

ws.add(a).add(Math);

console.log(
    ws.has(Math)  // true
);

console.log(
    ws.has(a),    // true
    ws.has(Math), // true
    ws.has(b)     // false
);

ws.delete(a);

console.log(
    ws.has(a) // false
);