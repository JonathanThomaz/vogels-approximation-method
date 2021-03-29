import React, { useEffect, useState } from 'react';
import '../assets/css/App.css';
import { getResultado } from '../functions';

function Result(): JSX.Element {
    const [finalValue, setFinalValue] = useState(0);
    useEffect(() => {
        setFinalValue(getResultado());
    });

    return (
        <div className="App">
            <h1>Resultado Final: {finalValue} </h1>
        </div>
    );
}

export default Result;
