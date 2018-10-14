// Expression bodies
let evens = [0, 2, 4, 6, 8, 10];
let odds = evens.map(v => v + 1);
let nums = evens.map((v, i) => v + i);
let pairs = evens.map(v => ({even: v, odd: v + 1}));

console.log('odds', odds);
console.log('nums', nums);
console.log('pairs', pairs);

let fives = [];
// Statement bodies
nums.forEach(v => {
    if (v % 5 === 0)
        fives.push(v);
});

console.log(fives);

// Lexical this
let bob = {
    _name: "Bob",
    _friends: ['Maria', 'John'],
    printFriends() {
        this._friends.forEach(f =>
            console.log(this._name + " knows " + f)
        );
    },
    printMoreFriends() {
        let me = this;
        this._friends.forEach(function (f) {
            console.log(me._name + " knows " + f);
        });
    }
};
bob.printFriends();
bob.printMoreFriends();


function Fun1() {}
const Fun2 = () => {};

new Fun1(); // OK
new Fun2(); // Fun2 is not a constructor