{
    let fibonacci = {
        [Symbol.iterator]() {
            let pre = 0, cur = 1;
            return {
                next() {
                    // Looks cool, but not an efficient implementation.
                    [pre, cur] = [cur, pre + cur];
                    return { done: false, value: cur }
                }
            }
        }
    };

    iterate(fibonacci);

    /* Transpiles to:

    var fibonacci = _defineProperty({}, Symbol.iterator, function () {
        var pre = 0,
            cur = 1;
        return {
            next: function next() {
                var _ref = [cur, pre + cur];
                pre = _ref[0];
                cur = _ref[1];

                return {done: false, value: cur};
            }
        };
    });

    */
}

{
    let fibonacci = {
        [Symbol.iterator]() {
            let pre = 0, cur = 1;
            return {
                next() {
                    let oldPre = pre;
                    pre = cur;
                    cur = oldPre + cur;
                    return { done: false, value: cur }
                }
            }
        }
    };

    iterate(fibonacci);
}

/*

Iteration is based on these duck-typed interfaces
(using TypeScript type syntax for exposition only):

interface IteratorResult {
    done: boolean;
    value: any;
}
interface Iterator {
    next(): IteratorResult;
}
interface Iterable {
    [Symbol.iterator](): Iterator
}

*/

function iterate(fibonacci) {
    for (let n of fibonacci) {
        // truncate the sequence at 1000
        if (n > 1000)
            break;
        console.log(n);
    }
}

{
    let fibonacci = {
        a: 'hey',
        b: 'hi',
        [Symbol.iterator]() {
            let pre = 0, cur = 1,
                value;

            return {
                next() {
                    value = pre;
                    pre = cur;
                    value = cur = value + cur;
                    return { done: value > 1000, value }
                }
            }
        }
    };

    for (let n of fibonacci) {
        console.log(n);
    }
}

{
    let obj = {}; // NOT an iterable!

    // For...of creates a loop iterating over iterable objects
    // (including Array, Map, Set, String, TypedArray,
    // arguments object and so on).

    // TypeError: obj[Symbol.iterator] is not a function
    // for (let v of obj) {
    //     console.log(v);
    // }
}

{
    let str = 'Hey';

    for (let c of str) {
        console.log(c);
    }
    // H
    // e
    // y
}

{
    let iterable = new Uint8Array([0x00, 0xff]);

    for (let value of iterable) {
        console.log(value);
    }
    // 0
    // 255
}

{
    let iterable = new Map([['a', 1], ['b', 2], ['c', 3]]);

    for (let entry of iterable) {
        console.log(entry);
    }
    // ['a', 1]
    // ['b', 2]
    // ['c', 3]

    for (let [key, value] of iterable) {
        console.log(value);
    }
    // 1
    // 2
    // 3
}

{
    (function() {
        for (let argument of arguments) {
            console.log(argument);
        }
    })(1, 2, 3);
    // 1
    // 2
    // 3
}

{
    // Note: This will only work in platforms that have
    // implemented NodeList.prototype[Symbol.iterator]
    // let articleParagraphs = document.querySelectorAll('article > p');
    //
    // for (let paragraph of articleParagraphs) {
    //     paragraph.classList.add('read');
    // }
}