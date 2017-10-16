var s = "𠮷";

// same as ES5.1
console.log(
    s.length === 2 // true
);

// new RegExp behaviour, opt-in ‘u’
console.log(
    s.match(/./u)[0].length === 2, // true
    s.match(/./u)                  // [ '𠮷', index: 0, input: '𠮷' ]
);

console.log(
    s.match(/./)[0].length === 1,  // true
    s.match(/./)                   // [ '�', index: 0, input: '𠮷' ]
);

console.log(
    s === '\uD842\uDFB7', // true
    // new form
    s === '\u{20BB7}'     // true
);

// new String ops
console.log(
    s.codePointAt(0) === 0x20BB7, // true
    s.charAt(0) === '\uD842',     // true
    s.charAt(1) === '\uDFB7'      // true

);

// for-of iterates code points
for(let c of s) {
    console.log(c, c.length);
}
// 𠮷 2