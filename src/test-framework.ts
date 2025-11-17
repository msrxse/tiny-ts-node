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
 * Behavior differences when parallel
 * - Parallel execution means logs can appear in any order
 * - Shared state can cause race conditions
 * - If tests depends on global state,parallel execution could break them
 * - Tests must be isolated (timers and async tasks will overlap)
*/
const runTestsInParallel = async () => {
    // Keeping track of passed and failed tests
    let passed = 0;
    let failed = 0;
    const startAll = performance.now();

    const promises = tests.map(async test => {
        try {
            const duration = performance.now();
            await test.fn();
            passed++;
            console.log(`✅ ${test.name} (${duration.toFixed(2)} ms)`);

        } catch (error) {
            console.log(`❌ ${test.name}: ${(error as Error).message}`);
            failed++;
        }
    });


    await Promise.all(promises);

    const totalDuration = performance.now() - startAll;
    console.log('\n--- Summary ---');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${passed + failed}`);
    console.log(`Total time: ${totalDuration.toFixed(2)} ms`);
};


export {
    describe,
    test,
    assertEqual,
    runTestsInParallel
};

