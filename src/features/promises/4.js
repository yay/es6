// function inSequence(promises) {
//     return promises.reduce(
//         (prev, next) => prev.then(next), Promise.resolve()
//     );
// }

function testFinally(shouldPass) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldPass) {
                resolve('Success!');
            } else {
                reject(new Error('Error!'));
            }
        }, 1000);
    });
}

testFinally(true)
    .then(v => console.log('then:', v))
    .finally(v => console.log('Finally true:', v));

testFinally(false)
    .catch(v => console.log('catch:', v))
    .finally(v => console.log('Finally false:', v));

// Output:

// then: Success!
// catch: Error: Error!
// Finally true: undefined
// Finally false: undefined