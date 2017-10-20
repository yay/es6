/*

Euclidean algorithm:
https://en.wikipedia.org/wiki/Euclidean_algorithm

Basically, given 2 numbers a and b, keep subtracting either
b from a or a from b (smaller from bigger) until the result
of the subtraction equals zero, at which point the latest biggest
value is the greatest common divisor.

*/

function gcd(a, b) {
    console.log(`${a}, ${b}`);
    while (b !== 0) {
        if (a > b) {
            a = a - b;
        } else {
            b = b - a;
        }
        console.log(`${a}, ${b}`);
    }
    console.log('');
    return a;
}

console.log(
    gcd(5, 3),     // 1
    gcd(18, 3),    // 3
    gcd(18, 6),    // 6
    gcd(17, 6),    // 1
    gcd(24, 18)    // 6
);