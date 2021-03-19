export function calcDifference(
    arrayCosts: Array<Array<number>>
): Array<number> {
    const differences: Array<number> = [];
    for (let i = 0; i < arrayCosts.length; i++) {
        let array = [];
        let min = 0;
        let min2 = 0;
        let difference = 0;
        array = arrayCosts[i].slice();
        min = Math.min(...array);
        array.splice(array.indexOf(min), 1);
        min2 = Math.min(...array);
        difference = min2 - min;
        differences.push(difference);
    }
    return differences;
}
