import React from 'react';
import '../assets/css/App.css';
import { cost_table } from '../utils/variables';
import { calcDifference } from '../functions';

export function Differences(): JSX.Element {
    const differences = calcDifference(cost_table.costs);
    return (
        <>
            <tr>
                <td>Diferenças</td>
            </tr>
            {differences.map((item, index) => (
                <tr key={index}>
                    <td>{item}</td>
                </tr>
            ))}
        </>
    );
}
