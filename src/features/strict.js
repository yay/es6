/*
1) strict mode eliminates some JavaScript silent errors
   by changing them to throw errors
2) strict mode fixes mistakes that make it difficult for JavaScript
   engines to perform optimizations: strict mode code can sometimes
   be made to run faster than identical code that's not strict mode
3) strict mode prohibits some syntax likely to be defined in future
   versions of ECMAScript.

   It is recommended to enable strict mode on a function-by-function
   basis because concatenating script and non-strict scripts is
   problematic.
 */

// function strict() {
//     // Function-level strict mode syntax
//     'use strict';
//     function nested() { return 'And so am I!'; }
//     return "Hi!  I'm a strict mode function!  " + nested();
// }
// function notStrict() { return "I'm not strict."; }
//
// console.log(strict());
// console.log(notStrict());

function boxing() {
    function notStrict() {
        let obj = {
            speak: function () {
                return this;
            }
        };
        console.log(obj.speak()); // obj
        var speak = obj.speak;
        // autoboxing (undefined this becomes global object automatically)
        console.log(speak().toString()); // global object
    }
    function strict() {
        'use strict';
        let obj = {
            speak: function () {
                return this;
            }
        };
        console.log(obj.speak()); // obj
        var speak = obj.speak;
        console.log(speak()); // undefined
    }

    notStrict();
    strict();
}

boxing();

function examples() {
    'use strict';
    heyThere = 17; // throws

    // Assignment to a non-writable global
    var undefined = 5; // throws a TypeError
    var Infinity = 5; // throws a TypeError
    // Notes: the two statements above didn't throw for me in
    // Node and Chrome (probably because this rule is no longer
    // the case in ES6 strict mode)

    // Assignment to a non-writable property
    var obj1 = {};
    Object.defineProperty(obj1, 'x', { value: 42, writable: false });
    obj1.x = 9; // throws a TypeError

    // Assignment to a getter-only property
    var obj2 = { get x() { return 17; } };
    obj2.x = 5; // throws a TypeError

    // Assignment to a new property on a non-extensible object
    var fixed = {};
    Object.preventExtensions(fixed);
    fixed.newProp = 'ohai'; // throws a TypeError

    // Undeletable property.
    delete Object.prototype; // throws a TypeError

    // Duplicate property name in object literal is allowed
    // in ES6 strict mode
    var obj = {
        hello: 'hey',
        hello: 'hi' // doesn't throw
    };
    console.log(obj.hello); // hi

    // In non-strict mode this is fine
    function sum(a, a, c) { // !!! syntax error
        'use strict';
        return a + b + c; // wrong if this code ran
    }

    // Strict mode forbids (old) octal syntax
    var badOct = 010; // throws
    var goodOct = 0o10;

    // Forbids setting properties on primitive values
    false.true = '';         // TypeError
    (14).sailing = 'home';   // TypeError
    'with'.you = 'far away'; // TypeError

    // Prohibits 'with'.
    var x = 17;
    with (obj) { // !!! syntax error
        // If this weren't strict mode, would this be var x, or
        // would it instead be obj.x?  It's impossible in general
        // to say without running the code, so the name can't be
        // optimized.
        console.log(x);
    }
}

examples();