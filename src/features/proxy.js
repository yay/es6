/*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

Proxies enable creation of objects with the full range of behaviors
available to host objects. Can be used for interception,
object virtualization, logging/profiling, etc.

Note: Proxies are not transpiled by Babel.

There are traps available for all of the runtime-level meta-operations:

var handler = {
    get: ...,
    set: ...,
    has: ...,
    deleteProperty: ...,
    apply: ...,
    construct: ...,
    getOwnPropertyDescriptor: ...,
    defineProperty: ...,
    getPrototypeOf: ...,
    setPrototypeOf: ...,
    enumerate: ...,
    ownKeys: ...,
    preventExtensions: ...,
    isExtensible: ...
}

*/

{
    // Proxying a normal object
    let target = {
        Bob: 'Marley'
    };
    let handler = {
        get: function (target, name) {
            return `Hello, ${name}!`;
        }
    };

    let p = new Proxy(target, handler);
    console.log(p.Vitaly); // Hello, Vitaly!
    console.log(p.Bob);    // won't print 'Marley'
}

{
    let target = {
        Bob: 'Marley'
    };
    let handler = {
        get: function (target, name) {
            return `Hello, ${name in target ? target[name] : 'stranger'}!`;
        }
    };

    let p = new Proxy(target, handler);
    console.log(p.Bob);    // Hello, Marley!
    console.log(p.Vitaly); // Hello, stranger!
}

{
    // Proxying a function object
    let target = function () {
        return 'I am the target';
    };
    let handler = {
        apply: function (target, ...args) {
            // To call the target method use:
            //
            //     target.apply(target, args)
            //
            // or in this case simply:
            //
            //     target()
            //
            return 'I am the proxy';
        }
    };

    let p = new Proxy(target, handler);

    console.log(
        p() // I am the proxy
    );
}