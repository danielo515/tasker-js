import React from 'react';
import './App.css';
import { Task } from './Task';
import { loadTask } from '../tasks';


// const devMode = process.env.NODE_ENV !== 'production';

let tasks;
if (!window.tk) {
    tasks = require('./fakeTask').tasks;
} else {
    tasks = { work: loadTask('work') };
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Task title='Work' {...tasks.work}></Task>
            </header>
        </div>
    );
}

export default App;
