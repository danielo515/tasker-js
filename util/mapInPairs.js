export const mapInPairs = fn => (arr) => 
{   
    const ln = arr.length;
    const acc = [];
    for (let i = 0; (i + 1) < ln; i += 2) {
        // not sure why I have to invert this
        acc.push(fn(arr[i + 1], arr[i]));
    }
    return acc;
};


