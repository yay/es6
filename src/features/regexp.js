const separator = () => console.log('------------');

// {
//     const str = '<span class="my"></span><div></div>';
//     const reg1 = /<(([a-z]+)\s*([^>]*))>/;
//     const reg2 = /<(([a-z]+)\s*([^>]*))>/g;
//     console.log(str.match(reg1));
//     console.log(str.match(reg2));
//
//     /*
//
// [ '<span class="my">',
//   'span class="my"',
//   'span',
//   'class="my"',
//
//   index: 0,
//   input: '<span class="my"></span><div></div>',
//   groups: undefined
// ]
//
// [ '<span class="my">', '<div>' ]
//
//      */
//
//     // `match` corresponds to $&
//     const result = str.replace(reg2, (match, g1, g2, g3, offset, string) => {
//         console.log(`${match} | ${g1} | ${g2} | ${g3} | ${offset} | ${string}`);
//         return match + "|";
//     });
//     console.log(result);
//
//     // <span class="my"> | span class="my" | span | class="my" | 0 | <span class="my"></span><div></div>
//     // <div> | div | div |  | 24 | <span class="my"></span><div></div>
// }

const svgPath = "M   5.005 16A1.003 1.003 0 0 1 4 14.992v-1.984A.998.998 0 0 1 5 12h1.252a7.87 7.87 0 0 1 .853-2.06l-.919-.925c-.356-.397-.348-1 .03-1.379l1.42-1.42a1 1 0 0 1 1.416.007l.889.882A7.96 7.96 0 0 1 12 6.253V5c0-.514.46-1 1-1h2c.557 0 1 .44 1 1v1.253a7.96 7.96 0 0 1 2.06.852l.888-.882a1 1 0 0 1 1.416-.006l1.42 1.42a.999.999 0 0 1 .029 1.377s-.4.406-.918.926a7.87 7.87 0 0 1 .853 2.06H23c.557 0 1 .447 1 1.008v1.984A.998.998 0 0 1 23 16h-1.252a7.87 7.87 0 0 1-.853 2.06l.882.888a1 1 0 0 1 .006 1.416l-1.42 1.42a1 1 0 0 1-1.415-.007l-.889-.882a7.96 7.96 0 0 1-2.059.852v1.248c0 .56-.45 1.005-1.008 1.005h-1.984A1.004 1.004 0 0 1 12 22.995v-1.248a7.96 7.96 0 0 1-2.06-.852l-.888.882a1 1 0 0 1-1.416.006l-1.42-1.42a1 1 0 0 1 .007-1.415l.882-.888A7.87 7.87 0 0 1 6.252 16H5.005zm3.378-6.193l-.227.34A6.884 6.884 0 0 0 7.14 12.6l-.082.4H5.005C5.002 13 5 13.664 5 14.992c0 .005.686.008 2.058.008l.082.4c.18.883.52 1.71 1.016 2.453l.227.34-1.45 1.46c-.004.003.466.477 1.41 1.422l1.464-1.458.34.227a6.959 6.959 0 0 0 2.454 1.016l.399.083v2.052c0 .003.664.005 1.992.005.005 0 .008-.686.008-2.057l.399-.083a6.959 6.959 0 0 0 2.454-1.016l.34-.227 1.46 1.45c.003.004.477-.466 1.422-1.41l-1.458-1.464.227-.34A6.884 6.884 0 0 0 20.86 15.4l.082-.4h2.053c.003 0 .005-.664.005-1.992 0-.005-.686-.008-2.058-.008l-.082-.4a6.884 6.884 0 0 0-1.016-2.453l-.227-.34 1.376-1.384.081-.082-1.416-1.416-1.465 1.458-.34-.227a6.959 6.959 0 0 0-2.454-1.016L15 7.057V5c0-.003-.664-.003-1.992 0-.005 0-.008.686-.008 2.057l-.399.083a6.959 6.959 0 0 0-2.454 1.016l-.34.227-1.46-1.45c-.003-.004-.477.466-1.421 1.408l1.457 1.466z";

// {
//     const commandsRe = /([a-zA-Z] *(?:-?\d*(?:\.\d+)?(?: *|,?))*)/g;
//
//     const result = svgPath.replace(commandsRe, (match, group, offset, string) => {
//         console.log(match);
//         console.log(group);
//         console.log(offset);
//         separator();
//     });
// }

// {
//     const commandsRe = /([a-zA-Z]( *(?:-?\d*(?:\.\d+)?(?: *|,?))*))/g;
//
//     const result = svgPath.replace(commandsRe, (match, g1, g2, offset, string) => {
//         console.log(match); // M5.005 16
//         console.log(g1);    // M5.005 16
//         console.log(g2);    //  5.005 16
//         console.log(offset);
//         separator();
//     });
// }

{
    const str = "Gogo John!";
    // exclude `Gogo` from capturing
    const regFirst = /(?:go)+ (\w+)/i;
    const regAll = /(?:go)+ (\w+)/gi;

    {
        const result = str.match(regFirst);
        console.log(result[0]); // Gogo John
        console.log(result[1]); // John
    }
    separator();
    // This is same as the above:
    {
        const result = regFirst.exec(str);
        console.log(result[0]); // Gogo John
        console.log(result[1]); // John
    }
    separator();

    {
        const result = str.match(regAll);
        console.log(result);
        // [ 'Gogo John' ]
    }
    separator();
    // Not the same as the above:
    {
        const result = regAll.exec(str);
        console.log(result);
        // [ 'Gogo John',
        //   'John',
        //   index: 0,
        //   input: 'Gogo John!',
        //   groups: undefined ]
    }
    separator();
}

{
    const commandsRe = /([a-zA-Z]) *((?:-?\d*(?:\.\d+)?(?: *|,?))*)/g;
    const splitRe = /-?[0-9]*\.?\d+/g;
    // const splitRe = /-?\d*(?:\.\d+)?(?: *|,?)/g;
    // const splitRe = /-?\d*(?:\.\d+)?(?:,| *)*/g;
    // 1) how to exclude spaces from match?
    // 2) why one extra match?

    let svgPath = "   \n       M130 110 C 120 140, 180 140, 170 110  z";
    const result = svgPath.replace(commandsRe, (match, g1, g2, offset, string) => {
        console.log(match); // M5.005 16
        console.log(g1);    // M
        console.log(g2);    //  5.005 16
        console.log(g2.match(splitRe));
        // console.log(g2.match(splitRe).map(parseFloat));
        console.log(offset);
        separator();
    });

    // const markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
    const markerRegEx = /(?=[AaCcHhLlMmQqSsTtVvZz])/g;
    // const markerRegEx = /(?=[MmLlSsQqLlHhVvCcSsQqTtAaZz])/g;
    let results = [];
    // console.log(svgPath.trim().split(markerRegEx));
    const commands = [];
    const params = [];
    svgPath.trim().split(markerRegEx).forEach(part => {
        commands.push(part.substr(0, 1));
        params.push(part.match(splitRe));
    });
    console.log(commands);
    console.log(params);
    // let match;
    // while ((match = markerRegEx.exec(svgPath))) { console.log(match); }
    // while ((match = markerRegEx.exec(svgPath))) { results.push(match); }
    // console.log(results);
}