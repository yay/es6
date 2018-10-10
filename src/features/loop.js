{
    const arr = [1, 2, 3, 4, 5];
    // iterates over iterable objects (including Array, Map, Set, arguments object and so on)
    for (let el of arr) {
        console.log(el);
    }

    console.log('-----------');

    const obj = {
        a: 'A',
        b: 'B',
        c: 'C'
    };
    // iterates a specified variable over all the enumerable properties of an object
    for (let key in obj) {  // 'of' is not possible here because Object is not iterable
        console.log(key);
    }
}