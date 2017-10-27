import { randomSortedNumbers } from "../helper/randomNumbers";
import { removeDuplicates } from "../helper/dedupe";

let arr = randomSortedNumbers(30, 0, 1000);
removeDuplicates(arr);
console.log(arr.join(' '));

function binarySearch(array, target) {
    let lo = 0;
    let hi = array.length - 1;

    console.log(`Binary search steps (index : value) for array of ${hi + 1} elements:`);

    while (lo <= hi) {
        let iMid = Math.floor((lo + hi) / 2);
        let vMid = array[iMid];

        console.log(`${iMid} : ${vMid}`);

        if (target === vMid)
            return iMid;
        else if (target < vMid)
            hi = iMid - 1;
        else
            lo = iMid + 1;
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