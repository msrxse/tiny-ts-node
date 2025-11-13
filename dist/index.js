"use strict";
function greet(name) {
    return `Hello, ${name}!`;
}
const nameFromArg = process.argv[2] ?? 'world';
console.log(greet(nameFromArg));
