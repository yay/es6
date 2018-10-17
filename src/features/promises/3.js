// Basically, a promise chain stops if there's an exception,
// looking down the chain for catch handlers instead.

new Promise((resolve, reject) => reject('failure'))
    .then(v => console.log(v))     // doesn't run
    .then(() => console.log('b'))  // doesn't run
    .then(() => console.log('c'))  // doesn't run
    .catch(err => console.log('Catch:', err))         // Catch: failure
    .then(() => console.log('Continue after catch')); // Continue after catch