/*

We have an array of objects A and an array of indexes B.
Reorder objects in array A with given indexes in array B.
Do not change array A's length.

Example:

var A = [C, D, E, F, G];
var B = [3, 0, 4, 1, 2];

sort(A, B);
// A is now [D, F, G, C, E];

*/

function swap(arr, i, j) {
    let _ = arr[i];
    arr[i] = arr[j];
    arr[j] = _;
}

function quicksort(A, lo, hi, swap) {
    if (lo < hi) {
        let p = partition(A, lo, hi, swap);
        quicksort(A, lo, p, swap);
        quicksort(A, p + 1, hi, swap);
    }
}

function partition(A, lo, hi, swap) {
    let p = lo;
    let i = lo - 1;
    let j = hi + 1;

    for (;;) {
        do {
            i++;
        } while (A[i] < p);
        do {
            j--;
        } while (A[j] > p);

        if (j <= i) {
            return j
        }

        swap(A, i, j);
    }
}

let A = ['C', 'D', 'E', 'F', 'G'];
let B = [ 3,   0,   4,   1,   2 ];

function sort(A, B) {
    quicksort(B, 0, B.length - 1, (B, i, j) => {
        swap(B, i, j);
        swap(A, i, j);
    });
}

sort(A, B);

console.log(A, B);

