// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// The async function declaration defines an asynchronous function,
// which returns an AsyncFunction object. An asynchronous function is a function
// which operates asynchronously via the event loop, using an implicit Promise to return its result.

function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}


async function add1(x) {
    const a = await resolveAfter2Seconds(20);
    const b = await resolveAfter2Seconds(30);
    return x + a + b;
}

add1(10).then(v => {
    console.log(v);  // prints 60 after 4 seconds.
});


async function add2(x) {
    const p_a = resolveAfter2Seconds(20);
    const p_b = resolveAfter2Seconds(30);
    return x + await p_a + await p_b;
}

add2(10).then(v => {
    console.log(v);  // prints 60 after 2 seconds.
});