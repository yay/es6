function mergeSortStack(A) {
    let stack1 = [];
    let stack2 = [];

    for (let el of A) {
        stack1.push([el]);
    }

    while (stack1.length > 1) {

        while (stack1.length > 1) {
            let r = stack1.pop();
            let l = stack1.pop();
            let merged = merge(l, r);
            stack2.push(merged);
        }

        while (stack2.length > 1) {
            let r = stack2.pop();
            let l = stack2.pop();
            let merged = merge(l, r);
            stack1.push(merged);
        }

    }

    if (!stack1.length) {
        return stack2.pop();
    } else if (!stack2.length) {
        return stack1.pop();
    } else {
        return merge(stack1.pop(), stack2.pop());
    }
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
    let output = mergeSortStack(input);

    console.log(output);
}