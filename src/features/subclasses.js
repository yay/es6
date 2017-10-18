/*
In ES6, built-ins like Array, Date and DOM Elements can be subclassed.
*/

// // Pseudo-code of Array
// class Array {
//     constructor(...args) { /* ... */ }
//     static [Symbol.create]() {
//         // Install special [[DefineOwnProperty]]
//         // to magically update 'length'
//     }
// }

// User code of Array subclass
class MyArray extends Array {
    constructor(...args) {
        super(...args);
        this.name = 'MyArray';
    }
    talk() {
        console.log(`My name is ${this.name}`);
    }
    list() {
        for (let el of this) {
            console.log(el);
        }
    }
}

let arr = new MyArray(7, 5, 3, 1);
arr.talk();
arr.list();

console.log(arr[1]);     // 5
console.log(arr.length); // 4