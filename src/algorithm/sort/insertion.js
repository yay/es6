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

function insertionSort(arr) {
    let ln = arr.length;

    for (let i = 1; i < ln; i++) {
        let key = arr[i];

        let j = i;
        while (j > 0 && key < arr[j - 1]) {
            arr[j] = arr[j - 1];
            console.log(`Shift arr[${j - 1}] to the right`, arr);
            j--;
        }
        if (j < i) {
            arr[j] = key;
            console.log(`Pasting ${key} to arr[${j}]`, arr);
        } else {
            console.log(`Leave ${key} at index ${i}.`);
        }
    }
}

insertionSort(arr);
console.log('Sorted array:\n', arr);
