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