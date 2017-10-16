/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

The Map object holds key-value pairs.
Any value (both objects and primitive values) may be used
as either a key or a value.

Syntax: new Map([iterable])

An Array or other iterable object whose elements are key-value pairs
(arrays with two elements, e.g. [[ 1, 'one' ],[ 2, 'two' ]]).
Each key-value pair is added to the new Map;
null values are treated as undefined.

Objects and maps compared:
 * Objects only allow Strings and Symbols as keys

 * Map has the size property

 * A Map is an iterable

 * An Object has a prototype, so there are default keys in the map
   that could collide with your keys if you're not careful.
   As of ES5 this can be bypassed by using map = Object.create(null),
   but this is seldom done.

 * A Map may perform better in scenarios involving frequent addition
   and removal of key pairs.
*/

{
    let m = new Map([['a', 'hey']]);

    console.log(m); // Map { 'a' => 'hey' }
    console.log(m.get('a')); // hey

    m.set('b', 'hi');

    console.log(m); // Map { 'a' => 'hey', 'b' => 'hi' }
    console.log(m.size); // 2

    console.log(m.entries()); // MapIterator { [ 'a', 'hey' ], [ 'b', 'hi' ] }
    console.log(m.keys()); // MapIterator { 'a', 'b' }
    console.log(m.values()); // MapIterator { 'hey', 'hi' }

    // iterates entries in the insertion order
    for (let entry of m) {
        console.log(entry);
    }
    // [ 'a', 'hey' ]
    // [ 'b', 'hi' ]

    m.forEach((value, key, map) => {
        console.log(value, key);
    });
    // hey a
    // hi b

    for (let key of m.keys()) {
        console.log(key);
    }
    // a
    // b

    for (let value of m.values()) {
        console.log(value);
    }
    // hey
    // hi

    console.log(Array.from(m));          // [ [ 'a', 'hey' ], [ 'b', 'hi' ] ]
    console.log(Array.from(m.keys()));   // [ 'a', 'b' ]
    console.log(Array.from(m.values())); // [ 'hey', 'hi' ]

    console.log(m.has('b')); // true
    m.delete('b');
    console.log(m.has('b')); // false

    m.clear();

    console.log(m); // Map {}
}