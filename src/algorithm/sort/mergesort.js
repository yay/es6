/*
Mergesort is a divide and conquer algorithm that was invented by John von Neumann
in 1945. Most implementations produce a stable sort - preserve the input order
of equal elements in the sorted output.

Does not work in place (unlike selection, insertion, quick sorts etc.)

Merge sort has an average and worst-case performance of O(n * log(n)).
If the running time of merge sort for a list of length n is T(n),
then the recurrence T(n) = 2T(n/2) + n follows from the definition
of the algorithm (apply the algorithm to two lists of half the size
of the original list, and add the n steps taken to merge the resulting two lists).

1) divide step (finding the midpoint) takes O(1) time
2) merging the arrays takes O(n) time at each level of recursion
   whether it's merging 2 sub-arrays of size n/2 each
   or 4 sub-arrays of size n/4 each
   and so on until the size of each sub-problem is 1
3) the number of levels of recursion is log2(n) + 1
   because each time we divide each sub-problem in half:
   n + n/2 + n/4 + n/8 + ... + 1 = log2(n) + 1

   1 + 2 + 4 + 8 + ... = 2^0 + 2^1 + 2^2 + 2^3 + ...
   log2(n) = k basically means that we need to take k-th root or n to get 2,
   and we have k + 1 summands, the remaining one being 1.
*/

// [lo, hi)
function mergesort(A, lo, hi) {
    let B = A.slice();        // work array
    splitMerge(B, A, lo, hi); // sort data from B into A
    return A;
}

// [lo, hi)
function splitMerge(B, A, lo, hi) {
    if (hi - lo < 2) {
        return;
    }

    let mid = Math.floor((lo + hi) / 2);

    splitMerge(A, B, lo, mid);
    splitMerge(A, B, mid, hi);

    merge(B, A, lo, mid, hi);
}

// Merge two arrays [lo, mid) [mid, hi) in A
// into [lo, hi) in B
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

{
    console.log('Merge two sorted arrays test:');
    let input = [6,8,9,1,3,3,4,5];
    let output = [];

    console.log(input);
    merge(input, output, 0, 3, input.length);
    console.log(output);
}

{
    let arr = [7, 1, 5, 2, 9, 3];

    console.log('Top-down merge sort test (recursive):');
    console.log(arr);
    mergesort(arr, 0, arr.length);
    console.log(arr);
}

function bottomUpMergeSort(A) {
    let n = A.length;
    let B = A.slice(); // work array

    for (let width = 1; width < n; width *= 2) {
        for (let i = 0; i < n; i += 2 * width) {
            merge(A, B, i, Math.min(i + width, n), Math.min(i + 2 * width, n));
        }
        copyArray(B, A, n);
    }
}

function copyArray(A, B, n) {
    for (let i = 0; i < n; i++) {
        B[i] = A[i];
    }
}

{
    let arr = [7, 1, 5, 2, 9, 3];

    console.log('Bottom-up merge sort test (non-recursive):');
    console.log(arr);
    bottomUpMergeSort(arr);
    console.log(arr);
}