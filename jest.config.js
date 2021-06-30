module.exports = {
    verbose: false,
    testEnvironment: "node",
    reporters: [["@codewars/jest-reporter", {}]],
    // Don't transform with Babel by default.
    // The runner will overwrite this file when necessary.
    transform: {},
};