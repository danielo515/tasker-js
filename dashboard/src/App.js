import React from 'react';
import './App.css';
import { Task } from './Task';


const devMode = process.env.NODE_ENV !== 'production';

let tasks;
if (devMode) {
  tasks = require('./fakeTask').tasks;
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
