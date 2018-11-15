new Promise((resolve, reject) => resolve('success'))
    .then(v => console.log(1, v))   // 1 'success'
    .then(v => console.log(2, v))   // 2 undefined
    .then(v => {
        console.log(3, v);          // 3 undefined
        return 5;
    })
    .then((v) => {
        console.log(4, v);          // 4 5
        throw new Error('failure');
    })
    .catch(err => console.log(err))       // Error: failure
    .then(() => console.log('Carry on')); // Carry on