import React from 'react';
import './App.css';
import { Task } from './Task';
import { loadTask } from '../tasks';


// const devMode = process.env.NODE_ENV !== 'production';

let tasks;
if (!window.tk) {
    tasks = { work: require('../../fixtures/fakeTask').running };
} else {
    tasks = { work: loadTask('work') };
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {tasks ? <Task title='Work' {...tasks.work}></Task> : 'NO tasks detected'}
            </header>
        </div>
    );
}

export default App;
