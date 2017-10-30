/*
Mergesort is a divide and conquer algorithm that was invented by John von Neumann
in 1945. Most implementations produce a stable sort - preserve the input order
of equal elements in the sorted output.

Merge sort has an average and worst-case performance of O(n log n).
If the running time of merge sort for a list of length n is T(n),
then the recurrence T(n) = 2T(n/2) + n follows from the definition
of the algorithm (apply the algorithm to two lists of half the size
of the original list, and add the n steps taken to merge the resulting two lists).

Merge sort as implemented here is slower than the quick sort also implemented here:
54% slower in Chrome v62
22% slower in Safari v11

However in Firefox 56 the quick sort is 2% slower than merge sort.

https://jsperf.com/quick-sort-vs-merge-sort

*/

function mergeSort(A, B, start, end) {
    if (end - start < 2) return;
    let mid = ~~((start + end) / 2);
    mergeSort(A, B, start, mid);
    mergeSort(A, B, mid, end);
    merge(A, B, start, mid, end);
}

function merge(source, target, start, mid, end) {
    let i1 = start;
    let i2 = mid;
    for (let k = start; k < end; k++) {
        // still have elements in list1 <and>
        // (current element of list1 < current element of list2
        // <or> no more elements in list2)
        if (i1 < mid && (source[i1] < source[i2] || i2 >= end)) {
            target[k] = source[i1++];
        } else {
            target[k] = source[i2++];
        }
    }
}

{
    let input = [6,8,9,1,3,3,4,5];
    let output = [];
    merge(input, output, 0, 3, input.length);
    console.log(output);
}

{
    let source = [7, 1, 5, 2, 9, 3];
    let target = [];
    mergeSort(source, target, 0, source.length - 1);
    console.log(target);
}