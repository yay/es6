// If we rewrite this so that:
// - qsort closes over A (instead of passing it down a recursive call),
//   the runtime will be the same
// - qsort uses global variable A,
//   the runtime will be 2 times slower
function qsort(A, lo, hi) {
    if (lo < hi) {
        const p = partition(A, lo, hi);
        qsort(A, lo, p);
        qsort(A, p + 1, hi);
    }
}

function partition(A, lo, hi) {
    const p = A[Math.floor((lo + hi) / 2)];
    let i = lo - 1;
    let j = hi + 1;

    while (true) {
        do { i++ } while (A[i] < p);
        do { j-- } while (A[j] > p);
        if (j <= i) return j;
        [A[i], A[j]] = [A[j], A[i]];
    }
}

// This is an order of magnitude faster than the recursive version.
// And it's not because the recursive version additionally pushes A
// down the stack (not just lo, hi).
function stackQsort(A, lo, hi) {
    const stack = [[lo, hi]];
    while (stack.length) {
        [lo, hi] = stack.pop();
        if (lo >= hi) {
            break;
        }
        const p = partition(A, lo, hi);
        stack.push([lo, p]);
        stack.push([p + 1, hi]);
    }
}

// const A = Array(10).fill().map(_ => Math.floor(Math.random() * 100));
// const A = Array(10_000_000).fill().map(_ => Math.floor(Math.random()));
const A = [...Array(10_000_000).keys()]; // A[lo] as the pivot ruins performance in worst case scenario
// console.log(A.join(','));
console.time('qsort');
// qsort(A, 0, A.length - 1);
stackQsort(A, 0, A.length - 1);
console.timeEnd('qsort');
// console.log(A.join(','));