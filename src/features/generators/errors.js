function *foo() {
    try {
        const x = yield 3; // yields 3 and pauses, x is undefined
        console.log(`x: ${x}`);
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}

const it = foo();
console.log(it.next());
// { value: 3, done: false } - yield value 3
// console.log(it.next()); // if we uncomment this, code within foo will resume
                           // but we'll go out of the `try` block and
                           // it.throw('ERROR!') down below won't be caught
// x: undefined - resumed execution and printed the value of x
// { value: undefined, done: true } - yielded nothing (undefined)
//                                    there's only one yield statement in foo
it.throw('ERROR!'); // throw an error into the generator
                    // at the pause position
// Error: ERROR!
