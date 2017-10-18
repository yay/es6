function ListNode(val) {
    this.val = val;
    this.next = null;
}

function createArray(maxLen = 10, maxVal = 100) {
    let len = Math.floor(Math.random() * maxLen);
    let arr = Array.from(Array(len), () => Math.floor(Math.random() * maxVal));
    return arr.sort((a, b) => a - b);
}

function createList(arr) {
    let head = null,
        prev = null;

    arr.forEach((v) => {
        let node = new ListNode(v);
        if (prev) {
            prev.next = node;
        } else {
            head = node;
        }
        prev = node;
    });

    return head;
}

function createLists(k = 5) {
    let lists = [];

    for (let i = 0; i < k; i++) {
        let arr = createArray();
        let list = createList(arr);

        console.log(arr);

        if (list) {
            lists.push(list);
        }
    }

    return lists;
}

function printList(head) {
    let vals = [];
    while (head) {
        vals.push(head.val);
        head = head.next;
    }
    console.log(vals.join(', '));
}

function findMin(lists) {
    let min = Infinity;
    let iMin = -1;

    for (let i = lists.length - 1; i > -1; i--) {
        let head = lists[i];
        if (head && head.val < min) {
            min = head.val;
            iMin = i;
        }
    }

    if (iMin > -1) {
        let head = lists[iMin];
        if (head.next) {
            lists[iMin] = head.next;
        } else {
            lists.splice(iMin, 1);
        }
        return head;
    }

    return null;
}

function mergeKLists(lists) {
    let head, tail, next;

    next = head = tail = findMin(lists);

    while (next) {
        next = findMin(lists);
        if (next && next.val >= tail.val) { // use '>' to avoid dupes
            tail.next = next;
            tail = next;
        }
    }

    if (tail) {
        tail.next = null;
    }

    return head;
}

let lists = createLists();

// for (let head of lists) {
//     printList(head);
// }

let head = mergeKLists(lists);

console.log('Result:');
printList(head);
