/*

Given a sorted list of integers, square the elements and give the output in sorted order.

*/

let list = [-9, -8, -7, -5, -3, -2, 0, 1, 2, 3, 4, 6, 8, 10];

{
    // Time complexity:
    // n for map
    // n * log(n) for sort
    // n * log(n) overall
    let result = list.slice().map(v => v * v).sort((a, b) => a - b);
    console.log(result);
}

{
    let neg = [];
    let nonNeg = [];

    // Complexity: O(n)
    for (let el of list) {
        if (el < 0) {
            neg.push(el);
        } else {
            nonNeg.push(el);
        }
    }

    // Complexity: O(n)
    let posSqrt = nonNeg.map(v => v * v);    // non descending
    let negSqrt = neg.map(v => v * v);       // non ascending
    // Complexity: O(n)
    negSqrt = negSqrt.reverse();             // non descending

    // merge sort two sorted arrays
    let ni = 0;
    let pi = 0;
    let nc = negSqrt.length;
    let pc = posSqrt.length;
    let count = list.length;
    let result = [];

    // Complexity: O(n)
    for (let k = 0; k < count; k++) {
        if (ni < nc && (negSqrt[ni] < posSqrt[pi] || pi >= pc)) {
            result[k] = negSqrt[ni++];
        } else {
            result[k] = posSqrt[pi++];
        }
    }

    // Overall complexity: O(4n) = O(n)

    console.log(result);
}