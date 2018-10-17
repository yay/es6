new Promise((resolve, reject) => {
    resolve(777)
})
    .then(v => console.log(v)) // 777
    .then(v => Promise.reject(new Error('Whoops!')))
    .then(v => console.log(v)) // doesn't run
    .catch(v => console.log(v.message)); // Whoops!

// Without the `catch` at the end, we would get
// the UnhandledPromiseRejectionWarning exception.

// Even this won't save you:
try {
    new Promise((_, reject) => reject(new Error('Fail!')))
        .then(v => console.log(v));
} catch (e) {
    console.log("This won't ever be printed.");
}