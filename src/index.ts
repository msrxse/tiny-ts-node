import { describe, test, assertEqual, runTestsInParallel } from './test-framework';

describe('Init', () => {
  describe('My first test suite', () => {
    test('Adds numbers correctly', () => {
      const sum = 2 + 3;
      assertEqual(sum, 5);
    });

    test('fails when not equal', () => {
      assertEqual(2 * 2, 5);
    });
  });
});

describe('My second test suite', () => {
  /**
   * This tests has an async function that we mimic with a
   * returning promise with a settimeout.
  */
  test('Adds numbers correctly when async', async () => {
    const sum = await new Promise<number>((resolve) => setTimeout(() => {
      resolve(5);
    }, 500));

    assertEqual(sum, 5);
  });
});

runTestsInParallel();


/**
 * Other questions: 
 * 
 * What about assert?
 * ✅ How would you support async tests?
 * ✅ How you’d run tests in parallel?
 * How to add max concurrency? (advanced follow-up)
 * ✅ How would you group tests or show a summary?
 * Could you add colored output or timing info? 
 * Can you make assertEqual show deep equality?
 */

