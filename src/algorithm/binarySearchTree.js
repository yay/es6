class BNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BTree {
    constructor() {
        this.root = null;
    }

    find(data) {
        let it = this.root;

        while (it !== null) {
            if (it.data === data) {
                return true;
            } else {
                it = it.data < data ? it.right : it.left;
            }
        }
        return false;
    }

    _findR(data, root) {
        if (root) {
            if (root.data === data) {
                return true;
            } else {
                let next = root.data < data ? root.right : root.left;
                return this._findR(data, next);
            }
        }
        return false;
    }

    findRecursively(data) {
        return this._findR(data, this.root);
    }

    insert(data) {
        if (this.root === null) {
            this.root = new BNode(data);
        } else {
            let it = this.root;

            for (;;) {
                if (it.data === data) {
                    return false;
                } else {
                    if (it.data < data) {
                        if (it.right === null) {
                            it.right = new BNode(data);
                            break;
                        }
                        it = it.right;
                    } else {
                        if (it.left === null) {
                            it.left = new BNode(data);
                            break;
                        }
                        it = it.left;
                    }
                }
            }
        }

        return true;
    }

    remove(data) {
        if (this.root !== null) {
            let head = new BNode(null);
            let it = head;
            let parent = null;
            let found = null;

            let child = it.right = this.root;

            while (child !== null) {
                parent = it;
                it = child;

                if (it.data === data) {
                    found = it;
                }

                // Use '<=' so that we go right once from the 'found' node
                // then all the way left, till 'it' is an in-order successor
                // (left child is null), at which point we break the loop.
                child = it.data <= data ? it.right : it.left;
            }

            if (found !== null) {
                found.data = it.data;

                let child = it.left === null ? it.right : it.left;

                if (parent.right === it) {
                    parent.right = child;
                } else {
                    parent.left = child;
                }
            }

            this.root = head.right;
        }
    }

    _preOrder(root) {
        if (root !== null) {
            console.log(root.data);
            this._preOrder(root.left);
            this._preOrder(root.right);
        }
    }

    _inOrder(root) {
        if (root !== null) {
            this._inOrder(root.left);
            console.log(root.data);
            this._inOrder(root.right);
        }
    }

    _postOrder(root) {
        if (root !== null) {
            this._postOrder(root.left);
            this._postOrder(root.right);
            console.log(root.data);
        }
    }

    preOrder() {
        this._preOrder(this.root);
    }

    inOrder() {
        this._inOrder(this.root);
    }

    postOrder() {
        this._postOrder(this.root);
    }
}

export { BNode, BTree };