/*
Syntax: new WeakMap([iterable])

The WeakMap itself is not an iterable.

Keys of WeakMaps are of the type Object only.
Values can be of any type.

References to key objects are held "weakly",
which means that they do not prevent garbage collection
in case there would be no other reference to the object.

Real world use case: store custom data for DOM nodes (or other objects).

Because of references being weak, WeakMap keys are not enumerable
(i.e. there is no method giving you a list of the keys).
If they were, the list would depend on the state of garbage collection,
introducing non-determinism.

Methods: set, get, has, delete.

Note: weak maps can't be implemented manually, so they don't transpile to ES5.

*/

let wm = new WeakMap();

let a = {};
let b = {};
let c = {};

wm.set(a, { extra: 42 });
wm.set(b, 5);
wm.set(c, 'hey');

console.log(wm.has(a)); // true
wm.delete(a);
console.log(wm.has(a)); // false

console.log(wm.size === undefined);   // true
console.log(wm.keys === undefined);   // true
console.log(wm.values === undefined); // true

for (let entry of wm) { // wm[Symbol.iterator] is not a function
    console.log(entry);
}

