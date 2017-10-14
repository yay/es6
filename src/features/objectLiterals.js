let proto = {
    coolStuff: 'hey',
    sayHey() {
        console.log(this.coolStuff);
    },
    toString() {
        return 'such inheritance! so prototype!';
    }
};

function handler() {
    console.log('handled with care');
}

let obj = {
    // __proto__
    __proto__: proto,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
        // Super calls
        return 'super.toString(): ' + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
};

obj.handler();
console.log(obj.toString());
obj.sayHey();

for (let p in obj) {
    console.log(`${p}: ${obj[p]}`);
}
