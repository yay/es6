/*
Generators simplify iterator-authoring using 'function*' and 'yield'.

While custom iterators are a useful tool, their creation requires careful
programming due to the need to explicitly maintain their internal state.
Generator functions provide a powerful alternative: they allow you to define
an iterative algorithm by writing a single function whose execution
is not continuous.

A function declared as 'function*' returns a Generator instance.

Generators are subtypes of iterators which include additional next and throw.

interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}

*/

let fibonacci = {                    // let fibonacci = {
  [Symbol.iterator]: function*() {   //   [Symbol.iterator]() {
    let pre = 0;                     //     let pre = 0;
    let cur = 1;                     //     let cur = 1;
    for (;;) {                       //     return {
      [pre, cur] = [cur, pre + cur]; //       next() {
      yield cur;                     //         [pre, cur] = [cur, pre + cur];
    }                                //         return { done: false, value: cur };
  }                                  //       }
};                                   //     }
                                     //   }
                                     // }

for (let n of fibonacci) {
    if (n > 1000) break; // truncate the sequence at 1000
    console.log(n);
}
console.log('---------------------');
{
    // When called initially, generator functions do not execute any of their code,
    // instead returning a type of iterator called a Generator.
    const it = fibonacci[Symbol.iterator]();
    // When a value is consumed by calling the generator's 'next' method,
    // the Generator function executes until it encounters the 'yield' keyword.
    let result = it.next();
    while (!result.done && result.value < 1000) {
        console.log(result.value);
        result = it.next();
    }
}
// The 'fibonacci[Symbol.iterator]()' function can be called as many times as desired
// and returns a new Generator each time, however each Generator may only be iterated
// once.
console.log('---------------------');

function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i <= end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
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
{
    const iterable = {
        *[Symbol.iterator]() {
            yield 1;
            yield 2;
            yield 3;
        }
    };
    for (let value of iterable) {
        console.log(value);
    }
}
console.log('---------------------');
{
    // Some statements and expressions are expecting iterables,
    // for example the for-of loops, spread syntax, yield*,
    // and destructuring assignment.
    for (const value of ['a', 'b', 'c']) {
        console.log(value);
    }

    console.log([...'abc']); // [ 'a', 'b', 'c' ]

    // The yield* expression is used to delegate to another generator
    // or iterable object.
    function* gen() {
        yield* ['a', 'b', 'c'];
        return "That's it!";
    }
    const g = gen();
    console.log(g.next()); // { value: 'a', done: false }
    console.log(g.next()); // { value: 'b', done: false }
    console.log(g.next()); // { value: 'c', done: false }
    console.log(g.next()); // { value: "That's it!", done: true }

    const [a, b, c] = new Set(['a', 'b', 'c']);
    console.log(a, b, c); // a b c
}
console.log('---------------------');
function* fn1() {
    yield 42;
}
function* fn2() {
    yield* fn1(); // delegate to another generator
}
{
    const it = fn2();
    console.log(it.next().value);
}
console.log('---------------------');
function* g1() {
    yield 2;
    yield 3;
    yield 4;
}

function* g2() {
    yield 1;
    yield* g1();
    yield 5;
}
{
    const it = g2();
    console.log(it.next()); // { value: 1, done: false }
    console.log(it.next()); // { value: 2, done: false }
    console.log(it.next()); // { value: 3, done: false }
    console.log(it.next()); // { value: 4, done: false }
    console.log(it.next()); // { value: 5, done: false }
    console.log(it.next()); // { value: undefined, done: true }
}
console.log('---------------------');
function* g3() {
    yield* [1, 2];
    yield* '34';
    yield* Array.from(arguments);
}
{
    const it = g3(5, 6);
    console.log(it.next()); // { value: 1, done: false }
    console.log(it.next()); // { value: 2, done: false }
    console.log(it.next()); // { value: '3', done: false }
    console.log(it.next()); // { value: '4', done: false }
    console.log(it.next()); // { value: 5, done: false }
    console.log(it.next()); // { value: 6, done: false }
    console.log(it.next()); // { value: undefined, done: true }
}
console.log('---------------------');
// yield* is an expression, not a statement, so it evaluates to a value.
function* g4() {
    yield* [1, 2];
    return 'foo';
}
let result;
function* g5() {
    result = yield* g4();
}
const it = g5();
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: undefined, done: true }
console.log(result);    // foo