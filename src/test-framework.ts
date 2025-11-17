// Testing Framework Implementation

interface Test {
    name: string;
    fn: () => void | Promise<void>; // to support also async fns (also removes "'await' has no effect on the type of this expression" lint error)
}

type AssertArgs = string | number | boolean;

const assertEqual = (actual: AssertArgs, expected: AssertArgs) => {
    if (actual !== expected) {
        throw new Error(`${expected} is different than ${actual}`);
    }
};

const tests: Test[] = [];

const test = (name: string, fn: () => void) => {
    tests.push({ name, fn });
};

/**
 * To allow async functions you cannot use forEach
 * because even if the tests functions are marked as async,
 * the callback passed to forEach is not, so you get "await is only valid in top fns"
 * 
 * Fixed with "for of" loop - this respects async/await sequential flow
 * 
 * Notes:
 *
 * - forEach doesn’t await async callbacks — it just fires them and moves on. 
 * - for...of is perfect for test runners, network calls, etc. (The loop pauses on each await)
 */
const runTests = async () => {
    for (const test of tests) {
        try {
            // Await in case is an async function
            await test.fn();
            console.log(`✅ ${test.name}`);
        } catch (error) {
            // Error is a build in global, is part of the core language
            // Error is any unless you are using strict, that makes it unknown, which is safer
            // You can assert the type
            console.log(`❌ ${test.name}: ${(error as Error).message}`);
            // Or you can narrow it
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };
};

export {
    test,
    assertEqual,
    runTests
};

