/*
Find the distance (number of edges) between the farthest two elements in a binary tree.

       15
      /  \
     15  20
    /  \
   3    7
  	   /
  	  8
     /
    9

*/

import { BTree } from "../algorithm/binarySearchTree";

let btree = new BTree();

for (let i = 1; i <= 20; i++) {
    btree.insert(i);
}

function countToTheLeftMost(root) {
    if (!root.left) return 0;
    return countToTheLeftMost(root.left) + 1;
}

function countToTheRightMost(root) {
    if (!root.right) return 0;
    return countToTheRightMost(root.right) + 1;
}

let width = countToTheLeftMost(btree.root) + countToTheRightMost(btree.root);

console.log(`The distance between the farthest two elements
 in the given binary tree is ${width}.`);
// prints 19 - the tree of 20 elements is unbalanced as it gets