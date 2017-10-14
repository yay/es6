// Generate 'count' random numbers in the [x1, x2] interval.
// The result may contain duplicates.
function randomNumbers(count, x1, x2) {
    let numbers = [];
    let delta = x2 - x1;

    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(x1 + Math.random() * delta));
    }

    return numbers;
}

function randomSortedNumbers(count, x1, x2) {
    let result = randomNumbers(count, x1, x2);
    return result.sort((a, b) => a - b);
}

export { randomNumbers, randomSortedNumbers };