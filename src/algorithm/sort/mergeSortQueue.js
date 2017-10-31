function mergeSortQueue(A) {
    let queue = [];

    for (let i = 0, n = A.length; i < n; i++) {
        queue.push([A[i]]);
    }

    // for (let el of A) {
    //     queue.push([el]);
    // }

    while (queue.length > 1) {
        let l = queue.shift();
        let r = queue.shift();
        let merged = merge(l, r);
        queue.push(merged);
    }

    return queue.shift();
}

function merge(A, B) {
    let iA = 0;
    let iB = 0;
    let nA = A.length;
    let nB = B.length;
    let n = nA + nB;
    let result = Array(n);

    for (let i = 0; i < n; i++) {
        if (iA < nA && (A[iA] < B[iB] || iB >= nB)) {
            result[i] = A[iA++];
        } else {
            result[i] = B[iB++];
        }
    }

    return result;
}

{
    let input = [7, 1, 5, 2, 9, 3];
    let output = mergeSortQueue(input);

    console.log(output);
}