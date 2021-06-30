const balanced = string => {

    // console.log()

    /**
     * Test if I can create sets of new chars
     * in a way that:
     * - matches the length of max count of previous char set.
     * - resulting wildcard count===0
     *
     * @param wildcards
     * @param lastCount
     * @returns {boolean}
     */
    const canFit = (wildcards,lastCount)=>{

        // we can
        let isStillRoom = (wildcards / lastCount) + ARRANGED_COUNT < 53

        return (
            (wildcards>0)
            && ((wildcards%lastCount)===0)
            && (isStillRoom)
        )
    }

    /**
     * Sort [char,count] pairs by count, in decreasing order.
     * @param a
     * @param b
     * @returns {number} Array of tuples. ordered by count, with larger count first.
     */
    const sortMaxToMin = (a, b) => {

        if (a[1] < b[1]) {
            return 1;
        }
        if (a[1] > b[1]) {
            return -1;
        }
        // a must be equal to b
        return 0;
    }


    const rangeLowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const rangeUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const validCharCount = rangeLowerCase.length + rangeUpperCase.length


    /**
     *
     * @type {Map<string, number>}
     */
    const chars = new Map();



    // simple base cases
    if (string.length === 0) return true
    if (string.length === 1) return true
    if (string.length === 2) return true



    // count chars and wildcars
    let wildcards = 0;
    for (let i = 0; i < string.length; i++) {

        let currChar = string[i];

        if (currChar === '*') {
            wildcards++;
            continue;
        }

        if (!chars.has(currChar)) chars.set(currChar, 0)

        let curr = chars.get(currChar);
        chars.set(currChar, curr + 1)
    }

    // console.log(chars)
    const originalWildCount = wildcards;

    // [EDGE] string populated only with wildcards
    if (chars.size === 0) return true;

    // sorting the map
    let pairs    = [...chars.entries()]
    let arranged = pairs.sort(sortMaxToMin)

    // console.log(`string=${string} wildcards=${wildcards}`)
    // console.log(`ordenad count=${arranged.length}`, arranged)

    // previously we check there is at least 1 element.
    let initCount = arranged[0][1]; // keep first count

    // console.log(arranged)

    let lastCount = initCount;

    // try make all char set count equal to the max one, usign wildcards
    for (let i = 0; i < arranged.length; i++) {

        let val         = arranged[i];
        let currChar    = val[0]
        let currCount   = val[1]

        // comply then continue with next
        if (currCount === initCount) continue;

        // we know current is smaller, then we get the diff.
        let diff = initCount - currCount;


        if(diff > wildcards){
            // console.log(`char=${currChar}  diff=${diff} wild=${wildcards}`)
            // console.log(`index=${i} array`,arranged)
            return false;
        }
        else {
            // console.log(`diff=${diff} wild=${wildcards} char=${currChar}`)

            // while we have wildcards we use them
            wildcards = wildcards - diff;
            lastCount = currCount + diff;
        }
    }


    const ARRANGED_COUNT = arranged.length
    const DIVIDE         = Math.floor(wildcards / arranged.length)

    if(canFit(wildcards,lastCount)) return true;

    // distribute increasing by one the char set count
    let increaseWholeTimes = 0
    for (let i = DIVIDE; i > 0; i--) {

        let div = DIVIDE;

        increaseWholeTimes++;

        // console.log(`increaseWholeTimes ${increaseWholeTimes} n=${arranged.length}`,div)

        lastCount = lastCount + 1;
        wildcards = wildcards - (ARRANGED_COUNT);


        // edge : create tuples from wildcards [**] => [xx]

        let charsLeft = validCharCount - ARRANGED_COUNT

        // we can
        if(canFit(wildcards,lastCount)) return true;

    }

    // status
    // console.log(`wildcards=${wildcards} lastCount=${lastCount}`)



    // suppose 1 is left but more chars to add that wildcard
    if(arranged.length === validCharCount){
        return (wildcards === 0)
    }

    // standar condition
    return (wildcards===0)
        || (wildcards === lastCount)
        || (wildcards === arranged.length)
};

// let str = 'abd*xdx*yba*'
// let str = "*EC**L***DPO*X*"
// console.log(str,' true=',balanced(str))

export default balanced;