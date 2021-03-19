import React from 'react';
import '../assets/css/App.css';
import { Differences } from './Differences';

function App(): JSX.Element {
    return (
        <div className="App">
            <table>
                <Differences />
            </table>
        </div>
    );
}

export default App;
