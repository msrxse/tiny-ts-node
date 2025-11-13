import { test, assertEqual, runTests } from './test-framework';

test('Adds numbers correctly', () => {
  const sum = 2 + 3;
  assertEqual(sum, 5);
});

test('fails when not equal', () => {
  assertEqual(2 * 2, 5);
});

runTests();


/**
 * Other questions: 
 * 
 * What about assert?
 * How would you support async tests ?
 * How would you group tests or show a summary ?
 * Could you add colored output or timing info? 
 * Can you make assertEqual show deep equality?
 */

