;
const balanced = string => {

    if(string.length===1) return true
    if(string.length===2) return true

    console.log(string,string[0]===string[2])
    if(string.length===3) return (
        (string[0]!==string[1]) && (string[1]!==string[2])
    )





};

;(function() {
    const chai = require("chai");
    const assert = chai.assert;
    chai.config.truncateThreshold = 0;

    const fs = require ("fs");
    let res = fs.readFileSync('./test.js', 'utf8')
    console.log(res)

// babel.config.js
// jest.config.js
// node_modules
// package.json
// pnpm-lock.yaml
// test.js


// const testFolder = './';
// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// });

// console.debug(process)


    describe("Example Test Cases", () => {
        it("should work on provided examples", () => {
            assert.isTrue(balanced("a"), `Test failed for "a"`);
            assert.isTrue(balanced("ab"), `Test failed for "ab"`);
            assert.isTrue(balanced("abc"), `Test failed for "abc"`);
            assert.isFalse(balanced("abcb"), `Test failed for "abcb"`);
            assert.isFalse(balanced("Aaa"), `Test failed for "Aaa"`);
            assert.isFalse(balanced("abcb*"), `Test failed for "abcb*"`);
            assert.isTrue(balanced("abcb**"), `Test failed for "abcb**"`);
            assert.isTrue(
                balanced("***********"), `Test failed for "***********"`
            );
            assert.isTrue(balanced(""), `Test failed for ""`);
        });
    });;
})();