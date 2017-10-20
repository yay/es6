/*

https://leetcode.com/problems/search-in-rotated-sorted-array/description/

Suppose an array sorted in ascending order is rotated at some pivot
unknown to you beforehand.

(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

You are given a target value to search.
If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

*/

function findMin(nums) {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo < hi) {
        let mid = Math.floor((lo + hi) / 2);

        if (nums[mid] > nums[hi]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    return lo; // lo == hi at this point
}

function search(nums, target) {
    let pivot = findMin(nums);

    // We can't just perform a binary search 2 times at this point,
    // one to the left of the pivot and another to the right because
    // (suppose there's n elements in the first part and m in the second)
    // the run time is going to be lg(n) + lg(m) = lg(n * m) >> lg(n + m)

    let n = nums.length;
    let lo = 0;
    let hi = n - 1;

    while (lo <= hi) {
        let mid = Math.floor((lo + hi) / 2);
        let realMid = (mid + pivot) % n;

        if (nums[realMid] === target) {
            return realMid;
        } else if (target > nums[realMid]) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return -1;
}

//         0  1  2  3  4  5  6
let arr = [4, 5, 6, 7, 0, 1, 2];

console.log(
    findMin(arr),    // 4
    search(arr, 5),  // 1
    search(arr, 1)   // 5
);