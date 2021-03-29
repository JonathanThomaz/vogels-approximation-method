import {
    amount_order,
    cost_col,
    cost_table,
    final_table,
    inventory
} from '../utils/variables';

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
        if (min === 99 || min2 === 99) {
            differences.push(-1);
        } else {
            differences.push(difference);
        }
    }
    return differences;
}

export function maxValue(array: Array<number>): number {
    return Math.max(...array);
}

export function getResultado(): number {
    let valueFinal = 0;
    let costsRow: number[][] = [[]];
    let costsCol: number[][] = [[]];
    let amountOrder = [];
    let finalTable: number[][] = [[]];
    let supply = [];
    let dRow = [];
    let dCol = [];
    let c = 25;
    costsRow = cost_table.costs.slice();
    costsCol = cost_col.slice();
    amountOrder = amount_order.slice();
    finalTable = final_table.slice();
    supply = inventory.slice();
    dRow = calcDifference(costsRow);
    dCol = calcDifference(costsCol);
    while (c !== 0) {
        if (Math.max(...dCol) === -1 && Math.max(...dRow) === -1) {
            break;
        }
        if (Math.max(...dCol) > Math.max(...dRow)) {
            for (let i = 0; i < costsCol.length; i++) {
                if (dCol[i] === Math.max(...dCol)) {
                    for (let j = 0; j < costsCol[i].length; j++) {
                        if (costsCol[i][j] === Math.min(...costsCol[i])) {
                            if (amountOrder[j] < supply[i]) {
                                supply[i] = supply[i] - amountOrder[j];
                                finalTable[j][i] = amountOrder[j];
                                valueFinal =
                                    valueFinal +
                                    finalTable[j][i] * costsCol[i][j];
                                amountOrder[j] = 0;
                                for (let n = 0; n < costsRow[i].length; n++) {
                                    costsCol[n][j] = 99;
                                    costsRow[j][n] = 99;
                                }
                            } else {
                                supply[i] = amountOrder[j] - supply[i];
                                finalTable[j][i] = supply[i];
                                valueFinal =
                                    valueFinal +
                                    finalTable[j][i] * costsCol[i][j];
                                amountOrder[j] = amountOrder[j] - supply[i];
                                for (let n = 0; n < costsCol[i].length; n++) {
                                    costsCol[i][n] = 99;
                                    costsRow[n][i] = 99;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < costsRow.length; i++) {
                if (dRow[i] === Math.max(...dRow)) {
                    for (let j = 0; j < costsRow[i].length; j++) {
                        if (costsRow[i][j] === Math.min(...costsRow[i])) {
                            if (amountOrder[i] < supply[j]) {
                                supply[j] = supply[j] - amountOrder[i];
                                finalTable[i][j] = amountOrder[i];
                                valueFinal =
                                    valueFinal +
                                    finalTable[i][j] * costsRow[i][j];
                                amountOrder[i] = 0;
                                for (let n = 0; n < costsRow[i].length; n++) {
                                    costsCol[n][i] = 99;
                                    costsRow[i][n] = 99;
                                }
                            } else {
                                supply[j] = amountOrder[i] - supply[j];
                                finalTable[i][j] = supply[j];
                                valueFinal =
                                    valueFinal +
                                    finalTable[i][j] * costsRow[i][j];
                                amountOrder[i] = amountOrder[i] - supply[j];
                                for (let n = 0; n < costsCol[j].length; n++) {
                                    costsCol[j][n] = 99;
                                    costsRow[n][j] = 99;
                                }
                            }
                        }
                    }
                }
            }
        }
        dRow = calcDifference(costsRow);
        dCol = calcDifference(costsCol);
        c--;
    }
    return valueFinal;
}
