var n = 5;

function badEcho() {
    console.log('badEcho');
    // 'var' defines a variable globally, or locally
    // to an entire function regardless of block scope.
    for (var i = 0; i < n; i++) {
        setTimeout(function () {
            // Mutable variable is accessed from closure.
            console.log(i);
        }, i * 200);
    }
}

badEcho();
// 5
// 5
// 5
// 5
// 5

function goodEcho() {
    for (var i = 0; i < n; i++) {
        (function (i) {
            setTimeout(function () {
                if (!i) console.log('\ngoodEcho');
                console.log(i);
            }, 1000 + i * 200);
        })(i);
    }
}

goodEcho();
// 0
// 1
// 2
// 3
// 4

function betterEcho() {
    for (var i = 0; i < n; i++) {
        setTimeout(function (i) {
            if (!i) console.log('\nbetterEcho');
            console.log(i);
        }.bind(null, i), 2000 + i * 200)
    }
}

betterEcho();
// 0
// 1
// 2
// 3
// 4


function bestEcho() {
    // 'let' allows you to declare variables
    // that are limited in scope to the
    // block, statement, or expression on which it is used.
    for (let i = 0; i < n; i++) {
        setTimeout(function () {
            if (!i) console.log('\nbestEcho');
            console.log(i);
        }, 3000 + i * 200);
    }
    // The example above works as intended because the five instances
    // of the (anonymous) inner function refer to five different
    // instances of the variable i.
}

bestEcho();
// 0
// 1
// 2
// 3
// 4


// An expression is any valid unit of code that resolves to a value.
// x = 7   with side effects
// 3 + 4   without side effects