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

