// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// The async function declaration defines an asynchronous function,
// which returns an AsyncFunction object. An asynchronous function is a function
// which operates asynchronously via the event loop,
// using an implicit Promise to return its result.

// async function myFirstAsyncFunction() {
//     try {
//         const fulfilledValue = await promise;
//     }
//     catch (rejectedValue) {
//         // …
//     }
// }

// If you use the `async` keyword before a function definition,
// you can then use `await` within the function.
//
// When you await a promise, the function is paused in a non-blocking way
// until the promise settles. If the promise fulfills, you get the value back.
// If the promise rejects, the rejected value is thrown.

function resolveAfter2Seconds(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function add1(x) {
    // tasks are launched one by one
    const a = await resolveAfter2Seconds(20); // launch a task and wait for it to finish
    const b = await resolveAfter2Seconds(30); // then launch another task and wait for it to finish
    return x + a + b; // returns after 4 seconds
}

async function add2(x) {
    // two tasks launched at once
    const p_a = resolveAfter2Seconds(20); // launch a task
    const p_b = resolveAfter2Seconds(30); // launch a task
    return x + await p_a + await p_b; // wait for both tasks to finish
    // returns after 2 seconds
}

add1(10).then(v => {
    console.log('add1', v);  // prints 60 after 4 seconds.
});

add2(10).then(v => {
    console.log('add2', v);  // prints 60 after 2 seconds.
});

resolveAfter2Seconds(20)
    .then(v => resolveAfter2Seconds(30 + v))
    .then(v => console.log('then() chaining:', v + 10));

Promise.all([
    resolveAfter2Seconds(20),
    resolveAfter2Seconds(30)]
).then(v => {
    const result = v.reduce((a, b) => a + b, 0) + 10;
    console.log('Promise.all:', result);
});

async function returnValue() {
    const seven = await 7; // = await Promise.resolve(7)
    return 5 + seven; // wraps value into a promise automatically
}

returnValue().then(v => console.log(v)); // 12