// Awaiting promises in parallel is much easier with Promise.then and Promise.all,
// rather than 'await'.
// Note: run each example separately.
{
    const t = 10;
    for (let i = 0; i < 10000; i++) {
        setTimeout(() => {
            process.stdout.write('.');
        }, t);
    }
}

{
    const t = 10;
    const getDot = (delay) => {
        return new Promise(resolve => {
            setTimeout(() => resolve('.'), delay);
        });
    };
    for (let i = 0; i < 10000; i++) {
        getDot(t).then(dot => process.stdout.write(dot));
    }
}

{
    const t = 10;
    const getDot = (delay) => {
        return new Promise(resolve => {
            setTimeout(() => resolve('.'), delay);
        });
    };
    const dots = [];
    for (let i = 0; i < 10000; i++) {
        dots.push(getDot(t));
    }
    Promise.all(dots).then(value => console.log(value.join('')));
}

{
    const t = 10;
    const getDot = (delay) => {
        return new Promise(resolve => {
            setTimeout(() => resolve('.'), delay);
        });
    };
    const dots = [];
    for (let i = 0; i < 10000; i++) {
        dots.push(getDot(t));
    }
    (async () => {
        for (let i = 0; i < 1000; i++) {
            process.stdout.write(await dots[i]);
        }
    })();
}