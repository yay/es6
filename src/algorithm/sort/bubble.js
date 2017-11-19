function bubbleSort(A) {
    let n = A.length;
    var swapped;

    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            if (A[i-1] > A[i]) {
                let _ = A[i];
                A[i] = A[i-1];
                A[i-1] = _;
                swapped = true;
            }
        }
        n--;
    } while (swapped);
}


let arr = [7, 1, 5, 2, 9, 3];

console.log(arr);
bubbleSort(arr);
console.log(arr);