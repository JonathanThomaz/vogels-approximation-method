import React, { useEffect, useState } from 'react';
import '../assets/css/App.css';
import { getResultado } from '../functions';

function Result(): JSX.Element {
    const [finalValue, setFinalValue] = useState(0);
    const handleResult = () => {
        setFinalValue(getResultado());
    };

    return (
        <div className="App">
            <h1>Resultado Final: {finalValue} </h1>
            <button onClick={handleResult}>Ver resultado</button>
        </div>
    );
}

export default Result;
