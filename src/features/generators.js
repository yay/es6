/*
Generators simplify iterator-authoring using function* and yield.

A function declared as function* returns a Generator instance.

Generators are subtypes of iterators which include additional next and throw.

interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}

*/

let fibonacci = {
    [Symbol.iterator]: function*() {
        let pre = 0, cur = 1;
        for (;;) {
            let temp = pre;
            pre = cur;
            cur += temp;
            yield cur;
        }
    }
};

for (let n of fibonacci) {
    // truncate the sequence at 1000
    if (n > 1000)
        break;
    console.log(n);
}