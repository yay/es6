let singleton = (() => ({
    sayHi() {
        console.log('Hello!');
    }
}))();

singleton.sayHi();