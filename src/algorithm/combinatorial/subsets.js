/*

   # of el        list of subsets    # of subsets
---------------------------------------------------
     0            {}                       1
     1            {1} {2} {3}              3
     2            {12} {23} {13}           3
     3            {123}                    1
                                           8 <- total

   # of el        list of subsets    # of subsets
---------------------------------------------------
     0      {}                             1
     1      {1} {2} {3} {4}                4
     2      {12} {13} {14} {23} {24} {34}  6
     3      {123} {234} {134} {124}        4
     4      {1234}                         1
                                           16 <- total

The total number of subsets doubles each time:

A set with n elements has 2^n subsets.

Pascal's triangle:

# of el                                        # of subsets
in a set

0                        1                           1

1                      1   1                         2

2                   1    2    1                      4

3                1    3    3    1                    8

4              1    4    6    4    1                 16

5            1    5   10    10   5   1               32

6          1   6    15   20   15   6   1             64

7        1   7   21   35   35   21   7   1           128


E.g. for a set with 4 elements we have:

4C0 = 4! / (0!(4-0)!) = 1
4C1 = 4! / (1!(4-1)!) = 4
4C2 = 4! / (2!(4-2)!) = 6
4C3 = 4! / (3!(4-3)!) = 4
4C4 = 4! / (4!(4-4)!) = 1
                        16 total = 2 ^ 4

*/

let arr = [1, 2, 3, 4];

/*

The function below basically works like a DFS, backtracking when start >= s.length.

              -----------[ ]------------
             /            |        |    \
           [1]           [2]      [3]   [4]
         /  |  \         / \       |
        /   |   \       /   \      |
      [12] [13] [14]  [23] [24]  [34]
      /   \    \        |
   [123] [124] [134]  [234]
    /
 [1234]

*/

function printSubsets(s, ss = [], start = 0) {
    if (ss.length === 0) {
        console.log(ss);
    }
    for (let i = start; i < s.length; i++) {
        let nss = ss.concat(s[i]);
        console.log(nss);
        printSubsets(s, nss, i + 1);
    }
}

function printSubsetsOfSize(s, size = 2, ss = [], start = 0) {
    if (ss.length === 0 && size === 0) {
        console.log(ss);
    }
    for (let i = start; i < s.length; i++) {
        let nss = ss.concat(s[i]);
        if (nss.length < size) {
            printSubsetsOfSize(s, size, nss, i + 1);
        } else if (nss.length === size) {
            console.log(nss);
        }
    }
}

/*
Given an array of n positive integers, find the number of sub-arrays
such that product of the elements of those sub-arrays are less than k.
For example, arr = [2, 3, 6], k = 10
Number of such sub-arrays is 4: [2], [3], [6], [2,3]
*/

function countSubsets(s, k) {
    let n = 0;

    function count(s, ss = [], start = 0) {
        for (let i = start; i < s.length; i++) {
            let nss = ss.concat(s[i]);
            let prod = nss.reduce((a, b) => a * b);
            if (prod < k) {
                n++;
                console.log(nss, prod);
                count(s, nss, i + 1);
            }
        }
    }

    count(s);

    return n;
}

/*
Subset sum problem is to find subset of elements that are selected
from a given set whose sum adds up to a given number k.
*/

function subsetSum(s, k) {
    let n = 0;

    function subsets(s, ss = [], start = 0) {
        for (let i = start; i < s.length; i++) {
            let nss = ss.concat(s[i]);
            let sum = nss.reduce((a, b) => a + b);
            if (sum === k) {
                n++;
                console.log(nss, sum);
            } else if (sum < k) {
                subsets(s, nss, i + 1);
            }
        }
    }

    subsets(s);

    return n;
}


const br = () => console.log('-'.repeat(20));

{
    printSubsets(arr);
    br();
    printSubsetsOfSize(arr, 0);
    br();
    printSubsetsOfSize(arr, 1);
    br();
    printSubsetsOfSize(arr, 2);
    br();
    printSubsetsOfSize(arr, 3);
    br();
    printSubsetsOfSize(arr, 4);
    br();
}

{
    let arr = [2, 3, 6];
    console.log( countSubsets(arr, 10) );
    br();
}

{
    let arr = [1, 2, 3, 4, 5, 6, 7];
    console.log( subsetSum(arr, 10) );
    br();
}