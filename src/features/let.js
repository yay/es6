// At the top level of programs and functions, let, unlike var,
// does not create a property on the global object. For example:

var x = 'global';
let y = 'global';
console.log(this.x); // "global" (undefined in Node)
console.log(this.index); // undefined

function f1() {
    {
        let x;
        {
            const x = 'foo';  // ok
            // Assignment to constant variable.
            x = 'bar'         // error
        }
        // Identifier 'x' has already been declared
        let x = 'hey';        // error
    }
}

function f2() {
    setTimeout(() => {
        console.log('outer scope:', x);
    }, 500);

    {
        setTimeout(() => {
            console.log('inner scope:', x);
        }, 500);
        let x = 'hey'; // hoisted in the current scope
    }

    let x = 'hi'; // hoisted in the current scope
}

function f3() {
    // This is all fine:
    var x = 'hey';
    var x = 'hi';
    var x = 'again';

    console.log(x); // again
}

// f1();

f2();
f3();