/*
A divide and conquer algorithm developed by Tony Hoare in 1959.

- Pick an element as pivot
- Partition the given array around the picked pivot

Multiple ways of picking a pivot:
- first element
- last element
- random element
- median element

*/

/**
 * Sorts the slice of A between [lo, hi] using quicksort.
 * @param {Number[]} A
 * @param {Number} lo
 * @param {Number} hi
 */
function quicksort(A, lo, hi) {
    if (lo < hi) {
        let p = partition(A, lo, hi);
        quicksort(A, lo, p);
        quicksort(A, p + 1, hi);
    }
}

// Picks the first element as pivot.
function partition(A, lo, hi) { // [lo, hi]
    let pivot = A[lo];
    let i = lo - 1;
    let j = hi + 1;

    for (;;) {
        do {
            i++;
        } while (A[i] < pivot);

        do {
            j--;
        } while (A[j] > pivot);

        if (i >= j)
            return j;

        let _ = A[i];
        A[i] = A[j];
        A[j] = _;
    }
}

function quicksortEdu(A, lo, hi, depth = 0) {
    if (lo < hi) {
        let p = partitionEdu(A, lo, hi, depth);
        let pad = ' '.repeat(depth * 4);
        console.log(pad + `subdivide: (${lo}, ${p}) and (${p + 1}, ${hi})`);
        quicksortEdu(A, lo, p, depth + 1);
        quicksortEdu(A, p + 1, hi, depth + 1);
    }
}

function printIJ(arr, i, j, padStr) {
    let idx = '';
    let els = '';

    let lPad = 4;
    let rPad = 1;
    let pad = lPad + rPad;

    for (let k = 0, n = arr.length; k < n; k++) {
        let el = arr[k];
        els += el.toString().padStart(lPad).padEnd(pad);
        if (k === i && k === j) {
            idx += 'i,j'.toString().padStart(lPad+1).padEnd(pad-1);
        } else if (k === i) {
            idx += 'i'.toString().padStart(lPad).padEnd(pad);
        } else if (k === j) {
            idx += 'j'.toString().padStart(lPad).padEnd(pad);
        } else {
            idx += ' '.padStart(pad);
        }
    }
    console.log(padStr + idx);
    console.log(padStr + els);
}

function partitionEdu(A, lo, hi, depth) {
    let pivot = A[lo];
    let i = lo - 1;
    let j = hi + 1;

    let padStr = ' '.repeat(depth * 4);
    console.log(padStr + `partition - pivot:${pivot}, lo:${lo}, hi:${hi}`);

    for (;;) {
        do {
            i++;
            // j = hi + 1 index will never be used,
            // so make sure we don't print it.
            printIJ(A, i, j > hi && hi || j, padStr);
        } while (A[i] < pivot);

        do {
            j--;
            printIJ(A, i, j, padStr);
        } while (A[j] > pivot);

        if (i >= j) {
            console.log(padStr + `${j} is new pivot (i:${i} >= j:${j})`);
            return j;
        }

        console.log(padStr + `swap ${i}, ${j}`);
        console.log(padStr + A);

        let _ = A[i];
        A[i] = A[j];
        A[j] = _;

        console.log(padStr + A);
    }
}

{
    let arr = [7, 1, 5, 2, 9, 3];

    console.log(arr);
    quicksort(arr, 0, arr.length - 1);
    console.log(arr);
}
console.log('\r');
{
    let arr = [7, 1, 5, 2, 9, 3];
    quicksortEdu(arr, 0, arr.length - 1);
    console.log(arr);
}