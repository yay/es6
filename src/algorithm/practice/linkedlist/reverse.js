function createSinglyLinkedList(n = 10) {
    if (n <= 0) {
        return;
    }

    let head;
    let prev;
    for (let i = 0; i < n; i++) {
        const node = {
            value: i + 1
        };
        if (prev) {
            prev.next = node;
        }
        prev = node;
        if (i === 0) {
            head = node;
        }
    }

    return head;
}

function printLinkedList(head) {
    let str = '';
    while (head) {
        str += `(${head.value}) -> `;
        head = head.next;
    }
    console.log(str);
}

function reverse(head) {
    // 1 element - make first element point to nothing
    // 2 element - make second point to the first
    // 3 element - make 3rd point to the second
    // n element - make n-th element point to n - 1 element
    // return n-th element as head

    let prev;
    while (head) {
        const next = head.next;
        head.next = prev;
        prev = head;
        if (!next) {
            break;
        }
        head = next;
    }

    return head;
}

const ll = createSinglyLinkedList();
printLinkedList(ll);
printLinkedList(reverse(ll));