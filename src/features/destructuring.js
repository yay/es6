{
    let a, b, rest;
    [a, b] = [10, 20];
    console.log(a); // 10
    console.log(b); // 20

    [a, b, ...rest] = [10, 20, 30, 40, 50];
    console.log(a); // 10
    console.log(b); // 20
    console.log(rest); // [30, 40, 50]

    ({ a, b } = { a: 10, b: 20 });
    console.log(a); // 10
    console.log(b); // 20
}

{
    // list matching
    let [a, , b] = [1, 2, 3];
    console.log(a, b);
}

{
    function getASTNode() {
        return {
            op: 'A',
            lhs: {
                op: 'B'
            },
            rhs: 'C'
        };
    }
    // object matching
    let { op: a, lhs: { op: b }, rhs: c } = getASTNode();
    /*
        // Transpiles to:
        var _getASTNode = getASTNode(),
            a = _getASTNode.op,
            b = _getASTNode.lhs.op,
            c = _getASTNode.rhs;
     */

    console.log(a, b, c); // A B C

    // object matching shorthand
    // binds `op`, `lhs` and `rhs` in scope
    let {op, lhs, rhs} = getASTNode();

    console.log(op, lhs, rhs); // A {op: "B"} C
}

{
    // Can be used in parameter position
    function g({name: x}) {
        console.log(x);
    }
    g({name: 5}); // 5
}

{
    // Fail-soft destructuring
    let [a] = [];
    console.log(a === undefined); // true
}

{
    // Destructuring with defaults
    let [a = 1] = [];
    console.log(a === 1); // true

    let {b = 10, c = 5} = {b: 3};

    console.log(b); // 3
    console.log(c); // 5
}

{
    // Assigning to new variables names and providing default values
    let {a:aa = 10, b:bb = 5} = {a: 3};
    /*
        // Transpiles to:
        var _a = { a: 3 },
            _a$a = _a.a,
            aa = _a$a === undefined ? 10 : _a$a,
            _a$b = _a5.b,
            bb = _a$b === undefined ? 5 : _a$b;
     */

    console.log(aa); // 3
    console.log(bb); // 5
}

{
    // Setting a function parameter's default value
    function draw({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
        console.log(size, coords, radius);
    }

/*
function draw() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 'big' : _ref$size,
        _ref$coords = _ref.coords,
        coords = _ref$coords === undefined ? { x: 0, y: 0 } : _ref$coords,
        _ref$radius = _ref.radius,
        radius = _ref$radius === undefined ? 25 : _ref$radius;

    console.log(size, coords, radius);
}
 */

    draw({
        coords: {x: 18, y: 30},
        radius: 30
    });
    draw();
}

{
    // Nested object and array destructuring
    let metadata = {
        title: 'Scratchpad',
        translations: [
            {
                locale: 'de',
                title: 'JavaScript-Umgebung'
            },
            {
                locale: 'nl',
                title: 'JavaScript-Omgeving'
            }
        ],
        url: '/en-US/docs/Tools/Scratchpad'
    };

    // The [{title: localeTitle}] only gets the title
    // of the first object in the array.
    let {title: englishTitle, translations: [{title: localeTitle}]} = metadata;

    console.log(englishTitle); // "Scratchpad"
    console.log(localeTitle);  // "JavaScript-Umgebung"
}

{
    // For of iteration and destructuring
    let people = [
        {
            name: 'Mike Smith',
            family: {
                mother: 'Jane Smith',
                father: 'Harry Smith',
                sister: 'Samantha Smith'
            },
            age: 35
        },
        {
            name: 'Tom Jones',
            family: {
                mother: 'Norah Jones',
                father: 'Richard Jones',
                brother: 'Howard Jones'
            },
            age: 25
        }
    ];

    for (let {name: n, family: {father: f}} of people) {
        console.log('Name: ' + n + ', Father: ' + f);
    }

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
}

{
    // Unpacking fields from objects passed as function parameter
    function userId({id}) {
        return id;
    }

    function whois({displayName, fullName: {firstName: name}}) {
        console.log(displayName + ' is ' + name);
    }

    let user = {
        id: 42,
        displayName: 'jdoe',
        fullName: {
            firstName: 'John',
            lastName: 'Doe'
        }
    };

    console.log('userId: ' + userId(user)); // "userId: 42"
    whois(user); // "jdoe is John"
}

{
    // Computed object property names and destructuring
    let key = 'z';
    let {[key]: foo} = {z: 'bar'};

    console.log(foo); // "bar"
}

{
    // Invalid JavaScript identifier as a property name
    const foo = { 'fizz-buzz': true };
    const { 'fizz-buzz': fizzBuzz } = foo;

    console.log(fizzBuzz); // "true"
}