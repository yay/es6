import { randomNumbers } from "../helper/randomNumbers";

console.log('### Selection sort ###');

/**
 * Principle:
 * - find smallest from second to last, swap with first (if smaller)
 * - find smallest from third to last, swap with second (if smaller)
 * - ...
 */

// let arr = randomNumbers(30, 0, 1000);
let arr = [1, 5, 5, 1, 4, 3, 8, 6, 6];
// let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr);

/**
 * 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1
 * ​(8+1)+(7+2)+(6+3)+(5+4) = 9+9+9+9 = 4*9 = 36
 * What if the number of integers in the sequence is odd,
 * so that you cannot pair them all up? It doesn't matter!
 * Just count the unpaired number in the middle of the sequence
 * as half a pair.
 * 1 + 2 + 3 + 4 + 5
 * (1 + 5) * (2 + 0.5) = 15
 * A sequence from 1 to n is an arithmetic series.
 * The number of pairs is n / 2, whether n is odd or even;
 * the number of pairs will simply be fractional if n is odd.
 * sum(1..n) = (n + 1) * (n / 2)
 */

/**
 * Sorts the given array of numbers and returns it.
 * @param {Number[]} arr
 * @return {Number[]}
 */
function selectionSort(arr) {
    console.log(`Sorting array of ${ln} elements.`);

    let ln = arr.length;
    for (let i = 0, last = ln - 1; i < last; i++) {
        let min = arr[i];
        let minIndex;

        for (let j = i + 1; j < ln; j++) {
            let cur = arr[j];

            if (cur < min) {
                min = cur;
                minIndex = j;
            }
        }

        if (minIndex) {
            let tmp = arr[i];
            arr[i] = min;
            arr[minIndex] = tmp;
            console.log(`Swapping arr[${i}] and arr[${minIndex}]`, arr);
        } else {
            console.log(`arr[${i}] is already smallest`);
        }
    }

    return arr;
}

/**
 * The inner j-loop runs [n-1 .. 1] times = (n + 1) * n/2 - n = n*n/2 - n/2.
 * At worst n-1 swaps will be made.
 * The inner loop will always make n*n/2 - n/2 iterations,
 * regardless of the input.
 * Therefore, we can say that selection sort runs in Θ(n*n).
 * Worst case: Θ(n*n).
 * Best case: Θ(n*n).
 */
 */

selectionSort(arr);
console.log('Sorted array:\n', arr);