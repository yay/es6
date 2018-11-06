// http://exploringjs.com/es6/ch_modules.html

// node --experimental-modules modules.mjs

// Imports are hoisted.

// Default import followed by named imports.
import me, { FamilyClass, FamilyObject as Family } from './names';
// Namespace import: imports the module as an object.
import * as counter from './counter';

import { Parents } from "./re-exporting";
import { count } from "./re-exporting";

import './side-effects';

import fs from 'fs';

const counterText = fs.readFile('counter.mjs', 'utf-8', (err, contents) => {
    console.log('-----file contents-----');
    if (err) {
        console.log(err.message);
    } else {
        console.log(contents);
    }
    console.log('----------');
});

console.log(me);
console.log(FamilyClass.mom());
console.log(Family.dad);
console.log(Parents.mom);

console.log(counter.count); // 1
counter.incCount();
console.log(count);         // 2
// counter.count = 3; // ERROR
// imports of an ES6 module are read-only views on the exported entities

import('./dynamic.mjs').then((module) => {
    console.log(`Square of 5: ${module.default(5)}`);
    console.log(`Cube of 5: ${module.cube(5)}`);
});

// const dynamicModule = await import('./dynamic.mjs');
// console.log(`Cube of 5: ${dynamicModule.cube(5)}`);