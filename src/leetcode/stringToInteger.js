// '0'.charCodeAt(0) // 48
// '9'.charCodeAt(0) // 57

let map = new Map();

for (let i = 0; i < 10; i++) {
    map.set(String.fromCharCode(i + 48), i);
}

function strToInt(str) {
    let ln = str.length;

    if (ln) {
        let sum = 0;
        for (let i = ln - 1, p = 0; i > -1; i--, p++) {
            let char = str[i];
            if (i === 0 && char === '-') {
                if (ln === 1) {
                    throw "Just a minus?";
                } else {
                    sum *= -1;
                }
            }
            let digit = map.get(char);
            if (digit) {
                sum += digit * Math.pow(10, p);
            }
        }
        return sum;
    }
    throw "Empty string.";
}

console.log(
    strToInt('256'),
    strToInt('12'),
    strToInt('7849'),
    strToInt('0'),
    strToInt('-347'),
    strToInt('-0'),
    strToInt('+0'),
    strToInt('-8')
);

// console.log(strToInt(''));
// console.log(strToInt('-'));