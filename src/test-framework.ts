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
const groupStack: string[] = [];

const describe = (name: string, fn: () => void) => {
    groupStack.push(name);
    fn();
    groupStack.pop();
};

const test = (name: string, fn: () => void | Promise<void>) => {
    // To allow multiple describe nesting we join the groupStack into string separated by '>',
    // then add '>' to the last one followed by the actual name of the test
    const fullName = groupStack.length > 0 ? groupStack.join(' > ') + ' > ' + name : name;
    tests.push({ name: fullName, fn });
};

/**
 * Behaviour differences when parallel
 * - Parallel execution means logs can appear in any order
 * - Shared state can cause race conditions
 * - If tests depends on global state,parallel execution could break them
 * - Tests must be isolated (timers and async tasks will overlap)
 */
const runTestsInParallel = async () => {
    const promises = tests.map(async test => {
        try {
            await test.fn();
            console.log(`✅ ${test.name}`);
        } catch (error) {
            console.log(`❌ ${test.name}: ${(error as Error).message}`);
        }
    });

    await Promise.all(promises);
};


export {
    describe,
    test,
    assertEqual,
    runTestsInParallel
};

