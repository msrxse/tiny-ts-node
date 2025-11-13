// Testing Framework Implementation

interface Test {
    name: string;
    fn: () => void;
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

const runTests = () => {
    tests.forEach(test => {
        try {
            test.fn();
            console.log(`✅ ${test.name}`);

        } catch (error) {
            console.log(`❌ ${test.name}: ${(error as Error).message}`);
        }
    });
};

export {
    test,
    assertEqual,
    runTests
};