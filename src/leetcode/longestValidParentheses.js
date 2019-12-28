function longestValidParentheses(s) {
    const lengths = [];
    let length = 0;
    let max_length = 0;

    for (let i = 0, n = s.length; i < n; i++) {
        const c = s[i];

        if (c === '(') {
            lengths.push(++length);
            length = 0;
        } else if (c === ')') {
            if (lengths.length) {
                const top_length = lengths.pop();
                if (top_length % 2 == 1) {
                    length += top_length + 1;
                    if (length > max_length) {
                        max_length = length;
                    }
                }
            } else {
                length = 0;
            }
        } else {
            return 0;
        }
    }

    return max_length;
};

console.log(longestValidParentheses('()))(())()'));