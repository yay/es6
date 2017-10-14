import { randomSortedNumbers } from "./helper/randomNumbers";
import { removeDuplicates } from "./helper/dedupe";

let arr = randomSortedNumbers(30, 0, 1000);
removeDuplicates(arr);
console.log(arr.join(' '));

function binarySearch(array, value) {
    let min = 0;
    let max = array.length - 1;

    console.log(`Binary search steps (index : value) for array of ${max + 1} elements:`);

    while (max >= min) {
        let i = Math.floor((min + max) / 2);
        let v = array[i];

        console.log(`${i} : ${v}`);

        if (value === v) {
            return i;
        } else if (value < v) {
            max = i - 1;
        } else {
            min = i + 1;
        }
    }

    return -1;
}

let results = [
    binarySearch(arr, arr[5]),
    binarySearch(arr, arr[8]),
    binarySearch(arr, arr[11]),
];

console.log();
console.log(results);