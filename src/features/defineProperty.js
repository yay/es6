let obj = {name: 'Vitaly'};

// data descriptor
Object.defineProperty(obj, 'surname', {
    value: 'Kravchenko',
    enumerable: false,  // default
    writable: false,    // default
    configurable: false // default
});

// 'surname' is not listed
for (let p in obj) {
    console.log(p, obj[p]);
}

// has no effect or throws
// Chrome: "Cannot assign to read only property 'surname' of object '#<Object>'"
obj.surname = 'Hello';

// logs 'Kravchenko'
console.log(obj.surname);


let theAnswer = 42;
// accessor descriptor
Object.defineProperty(obj, 'answer', {
    get: function () { return theAnswer; },
    set: function (newAnswer) { theAnswer = newAnswer; }
});

console.log(obj.answer);
obj.answer = 50;
console.log(theAnswer);

// throws
// Chrome: "TypeError: Cannot redefine property: surname"
// Safari: "TypeError: Attempting to change access mechanism for an unconfigurable property."
Object.defineProperty(obj, 'surname', {
    get: function () { return 'You got it!'; }
});