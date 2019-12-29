// import '../../src/algorithm/graph/listGraphExample';
import { BNode, BTree } from '../../src/algorithm/binarySearchTree';

window.onload = function () {
    let btree = new BTree();

    for (let i = 1; i <= 10; i++) {
        btree.insert(i);
    }

    btree.inOrder();

    console.log('7 found:', btree.find(7));
    console.log('7 found recursively:', btree.findRecursively(7));
};