// TODO: unit test this

function isAscending(arr) {
    for (let i = 0, end = arr.length - 1; i < end; i++) {
        if (a[i] >= a[i + 1]) {
            return false;
        }
    }
    return true;
}

function isNonDescending(arr) {
    for (let i = 0, end = arr.length - 1; i < end; i++) {
        if (a[i] > a[i + 1]) {
            return false;
        }
    }
    return true;
}

function isDescending(arr) {
    for (let i = 0, end = arr.length - 1; i < end; i++) {
        if (a[i] <= a[i + 1]) {
            return false;
        }
    }
    return true;
}

function isNonAscending(arr) {
    for (let i = 0, end = arr.length - 1; i < end; i++) {
        if (a[i] < a[i + 1]) {
            return false;
        }
    }
    return true;
}
