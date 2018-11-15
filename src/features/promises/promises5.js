new Promise((resolve, reject) => {
    resolve(777)
})
    .then(v => console.log(v)) // 777
    .then(v => Promise.reject(new Error('Whoops!')))
    .then(v => console.log(v)) // doesn't run
    .catch(v => console.log(v.message)); // Whoops!

{
    // `then` calls is not just method chaining
    // on the original Promise, each `then` call actually
    // creates and returns a new Promise.
    const p = new Promise(resolve => resolve(5));
    const p1 = p.then(v => {});
    console.log(`p1.constructor.name: ${p1.constructor.name}`);
    console.log(`p = p1: ${ p === p1 }`);  // false
}

// Without the `catch` at the end, we would get
// the UnhandledPromiseRejectionWarning exception.

// Even this won't save you:
try {
    new Promise((_, reject) => reject(new Error('Fail!')))
        .then(v => console.log(v));
} catch (e) {
    console.log("This won't ever be printed.");
}