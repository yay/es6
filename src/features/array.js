if (!Array.of) {
    Array.of = function () {
        return Array.prototype.slice.call(arguments);
    };
}

function log(...args) {
    console.log(...args);
}

{
    let a = Array.of(5);
    let b = Array.of(1, 2, 3);
    let c = Array.of([1, 2], [3, 4]);

    console.log(a);
    console.log(b);
    console.log(c);
    // [ 5 ]
    // [ 1, 2, 3 ]
    // [ [ 1, 2 ], [ 3, 4 ] ]
}

{
    let r;
    let a = [1, 2, 3, 4];

    // push - adds to tail (vararg), returns new count
    r = a.push(9, 10);       log(a, r); // [ 1, 2, 3, 4, 9, 10 ]  6

    // pop - removes a single element from tail and returns it
    r = a.pop();             log(a, r); // [ 1, 2, 3, 4, 9 ]  10

    // shift - pops a single element head and returns it
    r = a.shift();           log(a, r); // [ 2, 3, 4, 9 ]  1

    // unshift - pushes to head (vararg), returns new count
    r = a.unshift(7, 8);     log(a, r); // [ 7, 8, 2, 3, 4, 9 ]  6
}

{
    let arr = Array(3);
    console.log(arr); // [ <3 empty items> ]

    arr.fill(0);
    console.log(arr); // [ 0, 0, 0 ]

    let brr = [].fill.call({length: 3}, 1);
    console.log(brr); // { '0': 1, '1': 1, '2': 1, length: 3 }
}
