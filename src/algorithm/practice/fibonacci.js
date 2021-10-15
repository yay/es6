// 0, 1, 1, 2, 3, 5, 8, 13, 21

function fibonacci(i) {
    if (i === 0) {
        return 0;
    } else if (i === 1) {
        return 1;
    } else {
        return fibonacci(i - 1) + fibonacci(i - 2);
    }
}

// Descend the first recursive call (first summand) all the way down,
// then start unwinding from it, while descending all they way down
// into the second recursive call (second summand) on each undwinding step.
// So basically just descending, then unwinding and descending at the same time.
// i = 6
// f(6 - 1)
// f(5 - 1)
// f(4 - 1)
// f(3 - 1)
// f(2 - 1)
// 1 + f(2 - 2) = 1 + 0 = 1
// 1 + f(3 - 2) = 1 + 1 = 2
// 2 + f(4 - 2) = 2 + 1 = 3
//     f(2 - 1) + f(2 - 2)
// 3 + f(5 - 2) = 3 + 2 = 5
//     f(3 - 1) + f(3 - 2) =
//     f(2 - 1) + f(2 - 2) + f(3 - 2) =
//     1 + 0 + 1 = 2
// 5 + f(6 - 2) = 5 + 3 = 8
//     f(4 - 1) + f(4 - 2) =
//     f(3 - 1) + f(3 - 2) + f(2 - 1) + f(2 - 2) =
//     f(2 - 1) + f(2 - 2) + 1 + 1 + 0 =
//     1 + 0 + 1 + 1 + 0 = 3

function fibonacciTail(i, current = 0, next = 1) {
    if (i === 0) {
        return current;
    } else {
        return fibonacciTail(i - 1, next, current + next);
    }
}

// Descend without unwinding.
// i = 6
// f(6 - 1, 1, 1)
// f(5 - 1, 1, 2)
// f(4 - 1, 2, 3)
// f(3 - 1, 3, 5)
// f(2 - 1, 5, 8)
// f(1 - 1, 8, 13) = 8

function fibonacciBest(i) {
    let curr = 0;
    let next = 1;

    for (; i; i--) {
        [curr, next] = [next, curr + next];
    }

    return curr;
}

// No BS, just keep adding and swapping. No calls, no calls to optimize.
// i = 6, 1, 1
// i = 5, 1, 2
// i = 4, 2, 3
// i = 3, 3, 5
// i = 2, 5, 8
// i = 1, 8, 13
// i = 0, return 8

const n = 100;
console.time('fibonacci');
console.log(fibonacci(n));
// console.log(fibonacciTail(n));
// console.log(fibonacciBest(n));
console.timeEnd('fibonacci');
// console.log([...Array(10).keys()].map(n => fibonacci(n)));