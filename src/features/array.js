if (!Array.of) {
  Array.of = function () {
    return Array.prototype.slice.call(arguments);
  };
}

function log(...args) {
  console.log(...args);
}

{
  let a = Array.of(5);
  let b = Array.of(1, 2, 3);
  let c = Array.of([1, 2], [3, 4]);

  console.log(a);
  console.log(b);
  console.log(c);
  // [ 5 ]
  // [ 1, 2, 3 ]
  // [ [ 1, 2 ], [ 3, 4 ] ]
}

{
  let r;
  let a = [1, 2, 3, 4];

  // push - adds to tail (vararg), returns new count
  r = a.push(9, 10);
  log(a, r); // [ 1, 2, 3, 4, 9, 10 ]  6

  // pop - removes a single element from tail and returns it
  r = a.pop();
  log(a, r); // [ 1, 2, 3, 4, 9 ]  10

  // shift - pops a single element head and returns it
  r = a.shift();
  log(a, r); // [ 2, 3, 4, 9 ]  1

  // unshift - pushes to head (vararg), returns new count
  r = a.unshift(7, 8);
  log(a, r); // [ 7, 8, 2, 3, 4, 9 ]  6
}

{
  let arr = Array(3);
  console.log(arr); // [ <3 empty items> ]

  arr.fill(0);
  console.log(arr); // [ 0, 0, 0 ]

  let brr = [].fill.call({ length: 3 }, 1);
  console.log(brr); // { '0': 1, '1': 1, '2': 1, length: 3 }
}

{
  const years = Array.apply(null, { length: 10 }).map((_, i) => i + 2000);
  console.log(years);
}

{
  const arr = [1, [2, 3], [[4]], 5];
  console.log(arr.flat()); // [ 1, 2, 3, [ 4 ], 5 ] // default depth is 1
  console.log(arr.flat(2)); // [ 1, 2, 3, 4, 5 ]
}

{
  const arr = [1, 2, 3, 4, 5];
  // two expressions below print the same output
  console.log(arr.flatMap((v) => [v, v])); // [1, 1, 2, 2, 3, 3, 4, 4, 5, 5 ]
  console.log(arr.map((v) => [v, v]).flat());
}

{
  const arr = [1, [2, 3], [4], 5].flatMap((v) => v * 2); // `v` is of type `number | number[]` here
  console.log(arr); // [ 2, NaN, 8, 10 ]

  const children = [
    {
      a: 1,
      b: 2,
      children: [
        {
          a: 3,
          b: 4,
          children: [
            {
              a: 5,
              b: 6,
            },
          ],
        },
        {
          a: 7,
          b: 8,
        },
      ],
    },
    {
      a: 9,
      b: 10,
    },
  ];

  const flatMapChildren = (children) => {
    return children.flatMap(({ children, ...child }) => [
      child,
      ...flatMapChildren(children || []),
    ]);
  };

  const flatChildren = flatMapChildren(children);
  console.log(flatChildren);
  // [
  //   { a: 1, b: 2 },
  //   { a: 3, b: 4 },
  //   { a: 5, b: 6 },
  //   { a: 7, b: 8 },
  //   { a: 9, b: 10 }
  // ]
}
