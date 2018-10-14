/*

The Promise object represents the eventual completion or failure
of an asynchronous operation, and its resulting value.

let promise = doSomething();
promise.then(successCallback, failureCallback);

or

promise
    .then(successCallback)
    .catch(failureCallback)

catch(failureCallback) is short for then(null, failureCallback)


Unlike old-style passed-in callbacks, a promise comes with some guarantees:

- Callbacks will never be called before the completion of the current run
  of the JavaScript event loop

- Callbacks added with .then even after the success or failure of the
  asynchronous operation, will be called

- Multiple callbacks may be added by calling .then several times,
  to be executed independently in insertion order

The 'then' function returns a new promise (different from the original)
returned by the then's successCallback, failureCallback or generated automatically.

*/

{
    function timeout(duration = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        });
    }

    let p = timeout(1000).then(() => {
        console.log(1);
        return timeout(2000);
    }).then(() => {
        console.log(2);
        throw new Error('dammit');
    }).catch(err => {
        // Creates a Promise that is resolved with an array of results
        // when all of the provided Promises resolve,
        // or rejected when any Promise is rejected.
        return Promise.all([timeout(100), timeout(200)]);
    });

    console.log(p);
    // Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
}

function inSequence(promises) {
    return promises.reduce(
        (prev, next) => prev.then(next), Promise.resolve()
    );
}

new Promise((resolve, reject) => resolve('success'))
    .then(v => console.log(1, v))   // 1 'success'
    .then(v => console.log(2, v))   // 2 undefined
    .then(v => {
        console.log(3, v);          // 3 undefined
        return 5;
    })
    .then((v) => {
        console.log(4, v);          // 4 5
        throw new Error('failure');
    })
    .catch(err => console.log(err))       // Error: failure
    .then(() => console.log('Carry on')); // Carry on

// Basically, a promise chain stops if there's an exception,
// looking down the chain for catch handlers instead.

new Promise((resolve, reject) => reject('failure'))
    .then(v => console.log(v))     // doesn't run
    .then(() => console.log('b'))  // doesn't run
    .then(() => console.log('c'))  // doesn't run
    .catch(err => console.log('Catch:', err))         // Catch: failure
    .then(() => console.log('Continue after catch')); // Continue after catch


// https://developers.google.com/web/updates/2017/10/promise-finally