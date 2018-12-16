function baz(z) {
    console.log(new Error().stack);
}

function bar(y) {
    baz(y + 1);
}

function foo(x) {
    bar(x + 1);
}

foo(3);

// Error
// at baz(5)
// at bar(4)
// at foo(3)
// at Object.<anonymous> // global scope
