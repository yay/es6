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
            setTimeout(() => {
                resolve(5);
            }, duration);
        });
    }

    let p = timeout(1000)
        .then(() => {
            console.log(1);
            return timeout(2000);
        })
        .then((value) => { // on resolve
            console.log(2);
            throw new Error('dammit');
        })
        .catch(reason => { // on reject
            // Creates a Promise that is resolved with an array of results
            // when all of the provided Promises resolve,
            // or rejected when any Promise is rejected.
            return Promise.all([timeout(100), timeout(200)]);
        })
        .then(v => console.log(v));

    console.log(p); // Promise { <pending> }
}