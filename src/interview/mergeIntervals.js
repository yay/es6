// Given a set of time intervals in any order,
// merge all overlapping intervals into one and output the result
// which should have only mutually exclusive intervals.
// Let the intervals be represented as pairs of integers for simplicity.

// For example, let the given set of intervals be { {1,3}, {2,4}, {5,7}, {6,8} }.
// The intervals {1,3} and {2,4} overlap with each other, so they should be merged
// and become {1, 4}. Similarly {5, 7} and {6, 8} should be merged and become {5, 8}.

const intervals = [[1,3], [2,4], [5,7], [6,8]];

function isOverlap([a, b], [c, d]) {
    return b > c || (c < a && d > a);
}

function mergeTwo([a, b], [c, d]) {
    return [
        Math.min(a, c),
        Math.max(b, d)
    ];
}

function mergeAll(intervals = []) {
    let merged = [];
    let ln = intervals.length;

    if (ln > 1) {
        intervals.reduce((acc, cur, i) => {
            let result;

            if (isOverlap(acc, cur)) {
                result = mergeTwo(acc, cur);
            } else {
                merged.push(acc);
                result = cur;
            }
            if (i === ln - 1) {
                merged.push(cur);
            }

            return result;
        });
    } else if (ln) {
        merged.push(intervals[0]);
    }

    return merged;
}

console.log(mergeAll(intervals));