/*

--- Performance with Float64Array arrays (pre-allocated size)
Browser       Quick        Merge          Built-in
-------------------------------------------------------------
Chrome 64    baseline     48% slower     73% slower
Safari 11    baseline     10% slower     88% slower
Firefox 56   baseline     25% slower     55% slower

--- In terms of absolute performance (ops/sec) ---
Safari 11     1213
Firefox 56    1057
Chrome 62     1039

Stock sort = array.sort((a, b) => a - b)

https://jsperf.com/quick-vs-merge-vs-stock

*/

// --- Setup code ---

function mergesort(A, lo, hi) {
    let B = A.slice();
    splitMerge(B, A, lo, hi);
    return A;
}

function splitMerge(B, A, lo, hi) {
    if (hi - lo < 2)
        return;

    let mid = ~~((lo + hi) / 2);

    splitMerge(A, B, lo, mid);
    splitMerge(A, B, mid, hi);

    merge(B, A, lo, mid, hi);
}

function merge(A, B, lo, mid, hi) {
    let i = lo;
    let j = mid;

    for (let k = lo; k < hi; k++) {
        if (i < mid && (j >= hi || A[i] <= A[j])) {
            B[k] = A[i++];
        } else {
            B[k] = A[j++];
        }
    }
}

function partition(A, lo, hi) {
    let pivot = A[lo];
    let i = lo - 1;
    let j = hi + 1;

    for (;;) {
        do {
            i++
        } while (A[i] < pivot);

        do {
            j--
        } while (A[j] > pivot);

        if (i >= j)
            return j;

        let _ = A[i];
        A[i] = A[j];
        A[j] = _;
    }
}

function quicksort(A, lo, hi) {
    if (lo < hi) {
        let p = partition(A, lo, hi);
        quicksort(A, lo, p);
        quicksort(A, p + 1, hi);
    }
}

var quickSortCopies = [];
var mergeSortCopies = [];
var stockSortCopies = [];

const n = 10000;

(() => {
    let arr = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = -100000 + Math.random() * 200000;
    }
    for (let i = 0; i < 100; i++) {
        quickSortCopies.push(arr.slice());
        mergeSortCopies.push(arr.slice());
        stockSortCopies.push(arr.slice());
    }
})();

var currentQuickSortCopy = 0;
var currentMergeSortCopy = 0;
var currentStockSortCopy = 0;


// --- Tests ---

mergesort(mergeSortCopies[currentMergeSortCopy++], 0, n);

quicksort(quickSortCopies[currentQuickSortCopy++], 0, n - 1);

stockSortCopies[currentStockSortCopy++].sort((a, b) => a - b);

