class X {
    constructor() { this._x = 'x' }
    get x() { return this._x }
    static get x() { return 'static x' }
    get ['0x']() { return '0x' }
    static get [Symbol.species]() { return Array }

    set x(value) { this._x = value }
    static set x(value) { X._x = value }
    set ['0x'](value) { console.log(`Greetings, ${value}!`) }
}

{
    let x = new X();

    console.log(x.x);     // x
    console.log(X.x);     // static x
    console.log(x['0x']); // 0x
    console.log(X[Symbol.species]); // [Function: Array]

    x.x = 'xyz';
    console.log(x.x);

    X.x = '@x@';
    console.log(X.x);   // static x
    console.log(X._x);  // @x@

    x['0x'] = 'Vitaly'; // Greetings, Vitaly!
}