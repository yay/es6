setTimeout(() => {
    console.log('never prints');
}, 0); // schedule for the next tick

// endless microtask queue on the current tick
Promise.resolve(5)
    .then(value => {
        console.log(value);
        while (true) {}
        return value + 5;
    })
    .then(value => console.log(value));
