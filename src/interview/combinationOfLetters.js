/*
Given a mapping from digits to list of letters and a string of digits
of arbitrary length determine all possible ways to replace the digits
with letters.

Input Mapping = {

    '1' → ['A', 'B', 'C'],

    '2' → ['D', 'E', 'F'],

    ...

}

Input String = “12”

Expected Output = [“AD”, “AE”, “AF”, “BD”, “BE”, “BF”, “CD”, “CE”, “CF”]

--- My notes ---

- so we need to find the number of combinations (unordered sets of unique elements)

- assuming that if we are given K digits, than the size of those sets should be K

- we can only use one letter from each list to form a combination, so the total
  number of combinations is the product of the length of lists

- assuming the we shouldn't remove duplicate digits from an input string, e.g.
  '2333' doesn't become '23'

*/

let inputMap = {
    '1': ['A', 'B', 'C'],
    '2': ['D', 'E', 'F'],
    '3': ['G', 'H', 'I', 'J', 'K'],
    '4': ['L', 'M'],
    '5': ['N', 'O', 'P'],
    '6': ['Q', 'R'],
    '7': ['S'],
    '8': [],
    '9': ['T', 'U', 'V', 'W'],
    '0': ['X', 'Y', 'Z']
};

let inputStr = '123';

// Loop

{
    function combine(list1, list2) {
        let result = [];
        if (!list1.length) {
            list1 = [''];
        } else if (!list2.length) {
            list2 = [''];
        }
        for (let e1 of list1) {
            for (let e2 of list2) {
                result.push(e1 + e2);
            }
        }
        return result;
    }

    function solve(inputStr, inputMap) {
        if (inputStr.length < 1) {
            return [];
        } else if (inputStr < 2) {
            return inputMap[inputStr[0]];
        }

        let result = inputMap[inputStr[0]];

        for (let i = 1, n = inputStr.length; i < n; i++) {
            let c = inputStr[i];
            result = combine(result, inputMap[c]);
        }
        return result;
    }

    // let result = solve(inputStr, inputMap);
    // console.log(result, result.length);
}

// Map/Reduce

{
    let lists = Array.from(inputStr).map(c => inputMap[c]);

    let result = lists.reduce((acc, val) => {
        let result = [];
        if (!acc.length) {
            acc = [''];
        } else if (!val.length) {
            val = [''];
        }
        for (let e1 of acc) {
            for (let e2 of val) {
                result.push(e1 + e2);
            }
        }
        return result;
    });

    console.log(result, result.length);
}