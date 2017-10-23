{
    const total = [1, 2, 3, 4, 5].reduce((sum, value) => {
        console.log(sum, value);
        return sum + value;
    });
    // Sum Value
    // 1   2
    // 3   3
    // 6   4
    // 10  5

    console.log(total); // 15
}

{
    let initialValue = 5;

    const total = [1, 2, 3].reduce((sum, value) => {
        console.log(sum, value);
        return sum + value;
    }, initialValue);
    // 5 1
    // 6 2
    // 8 3

    console.log(total); // 11 = 5 + 1 + 2 + 3
}

{
    let a = [0, 1];
    let b = [2, 3];
    let c = [4, 5];

    let flattened = [a, b, c].reduce((a, b) => a.concat(b), []);

    console.log(flattened, a, b, c);
    // [ 0, 1, 2, 3, 4, 5 ] [ 0, 1 ] [ 2, 3 ] [ 4, 5 ]

    let flattened2 = [a, b, c].reduce((a, b) => a.concat(b));

    console.log(flattened2, a, b, c);
    // [ 0, 1, 2, 3, 4, 5 ] [ 0, 1 ] [ 2, 3 ] [ 4, 5 ]
}

{
    [1, 2, 3, 4].reduce((accumulator, value, index, array) => {
        console.log(accumulator, value, index, array);
        return accumulator + value;
    });

    // 1 2 1 [ 1, 2, 3, 4 ]
    // 3 3 2 [ 1, 2, 3, 4 ]
    // 6 4 3 [ 1, 2, 3, 4 ]
}

{
    console.log(
        [2, 3, 4].reduce((a, b) => a * b)  // 24
    );
}

// A lot of the time I just don't see the point of using reduce.
// Often it results in more mental and performance overhead.
// Consider:

{
    const numbers = [2, 3, 4];

    const doubled = numbers.reduce((total, amount) => {
        total.push(amount * 2);
        return total;
    }, []);

    console.log(doubled); // [ 4, 6, 8 ]
}

{
    const numbers = [2, 3, 4];
    const doubled = [];
    for (let el of numbers) {
        doubled.push(el * 2);
    }

    console.log(doubled); // [ 4, 6, 8 ]
}
