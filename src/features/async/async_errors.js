// Examples of bad code and partial solutions to error handling.

async function test_throw() {
    try {
        try {
            const v = new Promise(() => {
                setTimeout(() => {
                    throw 'Failure';
                }, 100);
            });
        }
        catch (e) { // the throw above never caught
            console.log('Failed promise'); // won't ever be printed
        }
        throw new Error("Something's wrong here.");
    }
    catch (e) {
        console.log(e.message); // Something's wrong here.
    }
}

async function test_reject() {
    try {
        const v = Promise.reject(42);
    }
    catch (e) {
        // UnhandledPromiseRejectionWarning: 42
        // UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
        // [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

        console.error(e.message); // this won't ever be printed
    }
}

test_throw();
test_reject();


// Proper handling of both Promise rejection and thrown errors.

async function test_handled_reject() {
    const v = await Promise.reject(55)
        .catch(reason => console.log(`reason: ${reason}`)); // reason: 55
    console.log(`v: ${v}`); // v: undefined
}

async function test_handle_throw() {
    const v = await new Promise(() => { throw 'bla' })
        .catch(reason => console.log(`reason: ${reason}`)); // reason: bla
    console.log(`v: ${v}`); // v: undefined
}

test_handled_reject();
test_handle_throw();
