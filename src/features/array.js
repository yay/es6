if (!Array.of) {
    Array.of = function () {
        return Array.prototype.slice.call(arguments);
    };
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
