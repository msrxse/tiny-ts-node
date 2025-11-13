function greet(name: string) {
  return `Hello, ${name}!`;
}

const nameFromArg = process.argv[2] ?? 'world';

console.log('We are in test implementation branch');
console.log(greet(nameFromArg));