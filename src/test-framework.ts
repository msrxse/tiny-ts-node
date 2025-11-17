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
    test,
    assertEqual,
    runTestsInParallel
};

