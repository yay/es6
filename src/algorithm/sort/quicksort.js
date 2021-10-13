/*
A divide and conquer algorithm developed by Tony Hoare in 1959.

In merge sort, the divide step does hardly anything,
and all the real work happens in the combine step.
Quicksort is the opposite: all the real work happens in the divide step.
In fact, the combine step in quicksort does absolutely nothing.
Quicksort is not stable, unlike merge sort.

Quicksort has a couple of other differences from merge sort. Quicksort works in place.
And its worst-case running time is as bad as selection sort's and insertion sort's: O(n^2).
But its average-case running time is as good as merge sort's: O(n * log2(n)).

So why think about quicksort when merge sort is at least as good?
That's because the constant factor hidden in the big-Θ notation for quicksort is quite good.
In practice, quicksort outperforms merge sort, and it significantly outperforms selection sort
and insertion sort. Another reason quicksort is fast is cache efficiency.
Quicksort linearly scans the input and linearly partitions the input.

Why quicksort is O(n * log2(n))?
Because on each divide step we divide the array into two parts, which sums up to log2(n) operations.
(It's like the depth of the recursive call tree).
And on every conquer step we pass through the whole array, O(n) operations.

Why quicksort is O(n^2) in the worst case scenario?
The worst case is a pivot that's actually the smallest or largest element in the input.
If the input array is already sorted, we'll be subdividing the array n times in the divide step.
That is because the array is not split in half, but at the very edge, where one part has
one element and the other the rest of the elements.

The worst case is a pivot that's actually the smallest or largest element in the input. In this case, we do an O(N) partitioning level, but instead of getting two halves of equal size, we've ended up with one partition of one element, and one partition of N-1 elements.

- Pick an element as pivot
- Partition the given array around the picked pivot, so that
  1) elements < pivot are to the left from pivot
  2) elements > pivot are to the right from pivot

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
        const p = partition(A, lo, hi);
        quicksort(A, lo, p);
        quicksort(A, p + 1, hi);
    }
}

function partition(A, lo, hi) {
    const pivot = A[Math.floor((lo + hi) / 2)];
    let i = lo - 1;
    let j = hi + 1;

    for (;;) {
        // find the first/next element to the left of pivot that is greater than or same as pivot
        do {
            i++;
        } while (A[i] < pivot); // <= will result in same pivot being selected over and over

        // find the first/next element to the right of pivot that is less than or same as pivot
        do {
            j--;
        } while (A[j] > pivot); // >= will result in same pivot being selected over and over

        if (i >= j) {
            return j;
        }

        const _ = A[i];
        A[i] = A[j];
        A[j] = _;
    }
}

function quicksortEdu(A, lo, hi, depth = 0) {
    const pad = ' '.repeat(depth * 4);
    if (lo < hi) {
        const p = partitionEdu(A, lo, hi, depth);
        console.log(pad + `subdivide: (${lo}, ${p}) and (${p + 1}, ${hi})`);
        console.log('-'.repeat(50));
        quicksortEdu(A, lo, p, depth + 1);
        quicksortEdu(A, p + 1, hi, depth + 1);
    } else {
        console.log(pad + `--> don't partition ${lo}:${hi}`);
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
    const pivot = A[lo];
    // const pivot = A[Math.floor((lo + hi) / 2)];
    let i = lo - 1;
    let j = hi + 1;

    let padStr = ' '.repeat(depth * 4);
    console.log(padStr + `--> partition ${lo}:${hi} around ${pivot}`);

    for (;;) {
        console.log(padStr + `i++ while A[i] < ${pivot}`);
        do {
            i++;
            // j = hi + 1 index will never be used,
            // so make sure we don't print it.
            printIJ(A, i, j > hi && hi || j, padStr);
        } while (A[i] < pivot);

        console.log(padStr + `j-- while A[j] > ${pivot}`);
        do {
            j--;
            printIJ(A, i, j, padStr);
        } while (A[j] > pivot);

        if (i >= j) {
            console.log(padStr + `${j} is the new pivot (i:${i} >= j:${j})`);
            return j;
        }

        console.log(padStr + `swap ${i}:${A[i]}, ${j}:${A[j]}`);

        const _ = A[i];
        A[i] = A[j];
        A[j] = _;

        printIJ(A, i, j, padStr);
    }
}

// {
//     let arr = [7, 1, 5, 2, 9, 3];

//     console.log(arr);
//     quicksort(arr, 0, arr.length - 1);
//     console.log(arr);
// }
// console.log('\r');
{
    // let arr = [7, 1, 5, 2, 9, 3];
    let arr = [1, 2, 3, 4, 5];
    quicksortEdu(arr, 0, arr.length - 1);
    console.log(arr);
}
// console.log('\r');
// {
//     let arr = [9, 7, 5, 3, 2, 1]; // worst case
//     quicksortEdu(arr, 0, arr.length - 1);
//     console.log(arr);
// }