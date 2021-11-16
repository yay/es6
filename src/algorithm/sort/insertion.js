console.log('### Insertion sort ###');

/**
 * Principle:
 * - first element is a sorted sub-array, take second element and insert it
 *   before the first, if it's smaller
 * - first two elements are a sorted sub-array, take third element and shift
 *   elements to the right until the position for the third element is found
 * - ...
 */

/**
 * Worst case: Θ(n*n).
 * Best case: Θ(n).
 */

let arr = [1, 5, 5, 1, 4, 3, 8, 6, 6];
// let arr = [7, 6, 5, 4, 3, 2, 1];
console.log(arr);

// Average case time complexity: Θ(n*n).
// n elements times n-1 shifting operations; divided by two, because on average over all steps,
// half of the elements are already sorted; and again divided by two, because on average,
// the element to be sorted has to be moved to the middle of the already sorted elements:
// n*(n-1)/4 = 1/4 * n^2 - 1/4 * n

// Worst case time complexity: Θ(n*n).
// In the worst case, the elements are sorted completely descending at the beginning.
// In each step, all elements of the sorted sub-array must, therefore, be shifted to the
// right so that the element to be sorted – which is smaller than all elements already sorted
// in each step – can be placed at the very beginning.
// n*(n-1)/2 = 1/2 * n^2 - 1/2 * n

// Best case time complexity: Θ(n).
// If the elements already appear in sorted order, there is precisely one comparison
// in the inner loop and no swap operation at all. With n elements, that is, n-1 steps
// (since we start with the second element), we thus come to n-1 comparison operations.

// Insertion sort is good if the array is almost sorted, like when
// you are adding a few items to an already sorted array and need to resort it.
function insertionSort(arr) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const el = arr[i];

        let j = i;
        while (j > 0 && el < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j--;
        }
        if (j < i) {
            arr[j] = el;
        }
    }
}

insertionSort(arr);
console.log('Sorted array:\n', arr);
