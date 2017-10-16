/*

Syntax: new Set([iterable])

The Set object lets you store unique values of any type,
whether primitive values or object references.
You can iterate through the elements of a set in insertion order.
A value in the Set may only occur once.
 */

{
    let iterable = new Set([1, 1, 2, 2, 3, 3]);

    console.log(typeof iterable);         // Object
    console.log(iterable instanceof Set); // true

    for (let value of iterable) {
        console.log(value);
    }
    // 1
    // 2
    // 3
}

{
    let set = new Set(); // Set {}
    console.log(set);

    set.add('a');
    set.add(5);

    console.log(set); // Set { 'a', 5 }

    set.delete('a');

    console.log(set); // Set { 5 }

    set.add(NaN);
    set.add(NaN);

    console.log(set); // Set { 5, NaN }
    // even though NaN !== NaN

    set.add('a');

    console.log(set.size); // 3

    for (let key of set.keys()) {
        console.log(key);
    }
    // 5
    // NaN
    // a

    for (let value of set.values()) {
        console.log(value);
    }
    // 5
    // NaN
    // a

    for (let entry of set) {
        console.log(entry, typeof entry);
    }
    // 5 'number'
    // NaN 'number'
    // a string

    // Unlike MDN suggests here, the entries are not arrays of two elements.

    console.log(set.has(NaN)); // true
    console.log(set.has(6));   // false

    set.clear();

    console.log(set); // Set {}
}

{
    let text = 'Indiana';

    let set = new Set(text);
    console.log(set.size);   // 5
    console.log(set);        // Set { 'I', 'n', 'd', 'i', 'a' }
}

{
    let array = ['a', 'b', 'c', 'a'];

    let set = new Set(array);
    console.log(set);         // Set { 'a', 'b', 'c' }


}