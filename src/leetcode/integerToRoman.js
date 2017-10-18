// https://leetcode.com/problems/integer-to-roman

// https://en.wikipedia.org/wiki/Roman_numerals

// Symbol	I	V	X	L	C	D	M
// Value	1	5	10	50	100	500	1,000

let map = new Map([
    [1000, 'M'],
    [500, 'D'],
    [100, 'C'],
    [50, 'L'],
    [10, 'X'],
    [5, 'V'],
    [1, 'I']
]);

// Subtractive notation
// Number	4	9	40	90	400	900
// Notation	IV	IX	XL	XC	CD	CM

let subMap = new Map([
    ['DCCCC', 'CM'],  // 900
    ['CCCC',  'CD'],  // 400
    ['LXXXX', 'XC'],  // 90
    ['XXXX',  'XL'],  // 40
    ['VIIII', 'IX'],  // 9
    ['IIII',  'IV']   // 4
]);

function intToRoman(num) {
    let s = '';
    for (let [key, value] of map) {
        let whole = Math.floor(num / key);
        num -= whole * key;
        s += value.repeat(whole);
    }
    for (let [key, value] of subMap) {
        s = s.replace(key, value);
    }
    return s;
}

let testMap = new Map([
    [2542, 'MMDXLII'],
    [73, 'LXXIII'],
    [397, 'CCCXCVII'],
    [4, 'IV'],
    [1, 'I']
]);

for (let [key, value] of testMap) {
    console.assert(intToRoman(key) === value);
}
