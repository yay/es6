/*

Iteration is based on these duck-typed interfaces
(using TypeScript type syntax for exposition only):

interface Iterator {
    next(): IteratorResult;
}
interface IteratorResult {
    done: boolean;
    value: any;
}
interface Iterable {
    [Symbol.iterator](): Iterator
}

Iterators are consumed only as necessary and thus can express sequences
of unlimited size, such as the range of integers between 0 and Infinity.

*/
{
    // For...of creates a loop iterating over iterable objects
    // (including Array, TypedArray, String, Map, Set,
    // 'arguments' object and so on).

    let obj = {}; // NOT an iterable!

    // TypeError: obj[Symbol.iterator] is not a function
    // for (let v of obj) {
    //     console.log(v);
    // }
}

function iterate(iterable) {
    // for (let n of iterable) {
    //     if (n > 1000) break;
    //     console.log(n);
    // }
    const it = iterable[Symbol.iterator]();
    let result = it.next();
    while (result.value < 1000) {
        console.log(result.value);
        result = it.next();
    }
}

{
    let fibonacci = {
        [Symbol.iterator]() { // setup function that returns the Iterator
            let pre = 0;
            let cur = 1;
            return { // the actual Iterator
                next() {
                    [pre, cur] = [cur, pre + cur];
                    return { done: false, value: cur };
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

console.log('---------------------');
{
    let fibonacci = {
        a: 'hey',
        b: 'hi',
        [Symbol.iterator]() {
            let prev = 0;
            let value = 1;
            return {
                next() {
                    [prev, value] = [value, prev + value];
                    return { done: value > 1000, value };
                }
            }
        }
    };

    for (let n of fibonacci) {
        console.log(n);
    }
}
console.log('---------------------');
{
    for (let c of 'Hey') {
        console.log(c);
    }
    // H
    // e
    // y
}
console.log('---------------------');
{
    let iterable = new Uint8Array([0x00, 0xff]);

    for (let value of iterable) {
        console.log(value);
    }
    // 0
    // 255
}
console.log('---------------------');
{
    let iterable = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
    ]);

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
console.log('---------------------');
{
    (function() {
        for (let argument of arguments) {
            console.log(argument);
        }
    }(1, 2, 3));
    // 1
    // 2
    // 3
}
console.log('---------------------');
{
    // Note: This will only work on platforms that have
    // implemented NodeList.prototype[Symbol.iterator]
    // let articleParagraphs = document.querySelectorAll('article > p');
    //
    // for (let paragraph of articleParagraphs) {
    //     paragraph.classList.add('read');
    // }
}

function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let index = start;
    let iterationCount = 0;
    return {
        next() {
            if (index <= end) {
                const result = {
                    value: index,
                    done: false
                };
                index += step;
                iterationCount++;
                return result;
            }
            return { value: iterationCount, done: true };
        }
    };
}

{
    const it = makeRangeIterator(0, 10, 2);
    let result = it.next();
    while (!result.done) {
        console.log(result.value);
        result = it.next();
    }
}
console.log('---------------------');