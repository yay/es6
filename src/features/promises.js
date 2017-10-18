/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

*/

{
    function timeout(duration = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        })
    }

    let p = timeout(1000).then(() => {
        console.log(1);
        return timeout(2000);
    }).then(() => {
        console.log(2);
        throw new Error("hmm");
    }).catch(err => {
        return Promise.all([timeout(100), timeout(200)]);
    });
}