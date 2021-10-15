/*
The merge sort algorithm can be expressed in the form of the following recurrence relation:
T(n) = 2T(n / 2) + O(n)  <=  2 splits + 1 merge
After solving this recurrence relation using the master's theorem or recurrence tree method, we'll get the solution as O(n * log2(n)).
This time complexity is the same for best, worst and average cases.



Or we can do an intuitive complexity analysis.
Each time we're dividing the array in half. So we'll have log2(n) + 1 such divisions.
After we've devided everything, we start merging.
For every division we have an O(n) merge operation.

*/

// [lo, hi)
function mergeSort(S, lo, hi) {
    const T = S.slice(); // temporary work array
    splitMerge(T, S, lo, hi);
    return S;
}

// 2, 9, 3, 5, 7
// i = 0, mid = 2, j = 2
// 0 < 2 && 2 <= 3 => 2, i = 1
// 1 < 2 && 9 !<= 3 => 3, j = 3
// 1 < 2 && 9 !<= 5 => 5, j = 4
// 1 < 2 && 9 !<= 7 => 7, j = 5
// 1 < 2 && 9 !<= undefined  // invalid comparison because j is out of bounds,
//                           // but haven't reached k < hi condition just yet
// we have to just take 9, if j is out of bounds
// [lo, hi)
function merge(S, T, lo, mid, hi) {
    let i = lo;
    let j = mid;

    for (let k = lo; k < hi; k++) {
        // Step 1: if (i < mid && S[i] <= S[j]) {
        if (i < mid && (j >= hi || S[i] <= S[j])) { // Step 2 adds handling of rogue j
            T[k] = S[i++];
        } else {
            T[k] = S[j++];
        }
    }
}

// T 7 1 5 2 9
// S 7 1 5 2 9
//   S, T, 0, 2
//     T, S, 0, 1
//       1 - 0 < 2 => return
//     T, S, 1, 2
//       2 - 1 < 2 => return
//     merge(S, T, 0, 1, 2)
//     S 7 1 5 2 9
//     T 1 7 5 2 9
//   S, T, 2, 5
//     T, S, 2, 3
//       3 - 2 < 2 => return
//     T, S, 3, 5
//       S, T, 3, 4
//         4 - 3 < 2 => return
//       S, T, 4, 5
//         5 - 4 < 2 => return
//       merge(T, S, 3, 4, 5)
//       T 1 7 5 2 9
//       S 7 1 5 2 9
//     merge(S, T, 2, 3, 5)
//     S 7 1 5 2 9
//     T 1 7 2 5 9
//  merge(T, S, 0, 2, 5)
//  T 1 7 2 5 9
//  S 1 2 5 7 9
function splitMerge(S, T, lo, hi) {
    if (hi - lo < 2) {
        return;
    }

    const mid = Math.floor((lo + hi) / 2);

    splitMerge(T, S, lo, mid);
    splitMerge(T, S, mid, hi);

    merge(S, T, lo, mid, hi);
}

const A = Array(10).fill().map(_ => Math.floor(Math.random() * 100));
// const A = [7, 1, 5, 2, 9, 3];
console.log(A.join(','));
console.log(mergeSort(A, 0, A.length).join(','));