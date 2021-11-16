// Principle:
// - Perform a run through the array of N items, comparing each element with the one before it.
//   If the element is smaller, swap them. This way the largest element will make it to the end.
//   If nothing was swapped during the run, the array is sorted.
// - Repeat the process for the rest of the array of N-1 items.
function bubbleSort(A) {
    let n = A.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            if (A[i - 1] > A[i]) {
                [A[i - 1], A[i]] = [A[i], A[i - 1]];
                swapped = true;
            }
        }
        n--;
    } while (swapped); // nothing was swapped, so the array is already sorted
}


let arr = [7, 1, 5, 2, 9, 3];

console.log(arr);
bubbleSort(arr);
console.log(arr);