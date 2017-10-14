/**
 * Returns duplicates from the given array of numbers and returns it
 * (modifies the original array).
 * @param {Number[]} arr
 * @return {Number[]}
 */
function removeDuplicates(arr) {
    let prev = arr[arr.length - 1];

    for (let i = arr.length - 2; i > -1; i--) {
        if (arr[i] === prev) {
            arr.splice(i, 1);
        } else {
            prev = arr[i];
        }
    }
    return arr;
}

export { removeDuplicates };