/**
 * Converts a number to a string padding it with spaces.
 * @param {Number} n The number to convert to a string.
 * @param {Number} left
 * Make sure the resulting string is at least n characters
 * by adding spaces to the left.
 * @param {Number} right
 * The number of spaces to add to the right, regardless of `min`.
 * @return {string}
 */
function padES5(n, left = 0, right = 0) {
    let str = (n === null || isNaN(n)) ? '' : n.toString();
    let delta = left - str.length;
    if (delta > 0) {
        str = ' '.repeat(delta) + str;
    }
    str = str + ' '.repeat(right);
    return str;
}

function padES6(n, left = 0, right = 0) {
    return n.toString().padStart(left).padEnd(left + right);
}

let pad = String.prototype.padStart &&
          String.prototype.padEnd ? padES6 : padES5;

export default { pad };