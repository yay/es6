const string = 'Vitaly';

const results = [
    string.indexOf('ta'),    // 2
    string.indexOf('ma'),    // -1

    string.includes('ta'),   // true
    string.includes('ma'),   // false

    string.search(/ta/),     // 2
    string.search(/ma/),     // -1

    string.match(/ta/),      // [ 'ta', index: 2, input: 'Vitaly' ]
    string.match(/ma/)       // null
];

console.log(results);