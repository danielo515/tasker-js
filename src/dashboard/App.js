// @ts-check
import React from 'react';
import './App.css';
import { Task } from './Task';
import { loadTask } from '../tasks';


// const devMode = process.env.NODE_ENV !== 'production';

const taskNames = ['work','eating','workout'];
let tasks;
if (!window.tk) {
    window.tk = { global: () => {} };
    tasks = [ require('../../fixtures/fakeTask').running, loadTask('eating') ];
} else {
    tasks = taskNames.map(loadTask);
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {tasks.map( task => <Task {...task}></Task>)}
            </header>
        </div>
    );
}

export default App;
