const process = require('process');

// Any currently executed task can come off the task queue,
// or the microtask queue.

// All promise callbacks are queued as microtasks.

setTimeout(() => {
    console.log('on timeout')
}, 0); // the callback is placed on the task queue
       // will be executed on its next tick

const url = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

// Microtask queue ensures that promise callbacks are async,
// even if the promise has already settled.
Promise.resolve(5)
    .then(value => {         // placed on the microtask queue
        console.log(value);  // will be executed on its next tick
        return value + 7;
    })
    .then(value => {
        console.log(value);
        return fetch(url, { mode: "cors" }); // Promise {<pending>}
    })
    .then(response => response.blob())
    .then(blob => console.log(blob))
    .catch(reason => console.log(reason));

// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
process.nextTick(() => {
    console.log('on next tick');
});

// Some parts of this example only work in Node,
// some only in a browser, but this is how the order of output
// would look like if all code was supported in both environments:

// on next tick
// 5
// 12
// on timeout
// Blob(5969) {size: 5969, type: "image/png"}
