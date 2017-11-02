function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/*
Given binary tree [3, 9, 20, null, null, 15, 7]

    3
   / \
  9  20
    /  \
   15   7

return its level order traversal as:

[
  [3],
  [9,20],
  [15,7]
]
*/

let root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.right = new TreeNode(7);
root.right.left = new TreeNode(15);

function levelOrder(root, levels, level) {  // modified in-order
    if (root) {
        levelOrder(root.left, levels, level + 1);
        let arr = levels[level] || (levels[level] = []);
        arr.push(root.val);
        levelOrder(root.right, levels, level + 1);
    }
}

function levelOrder2(root, levels, level) { // modified post-order
    if (root) {
        levelOrder2(root.left, levels, level + 1);
        levelOrder2(root.right, levels, level + 1);
        let arr = levels[level] || (levels[level] = []);
        arr.push(root.val);

    }
}

{
    let levels = [];
    levelOrder(root, levels, 0);
    console.log(levels);
}

{
    let levels = [];
    levelOrder2(root, levels, 0);
    console.log(levels);
}