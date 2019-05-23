import React from 'react';
import './App.css';
import { Task } from './Task';
import { subHours, addHours } from 'date-fns';


const devMode = process.env.NODE_ENV !== 'production';

let tasks;
if (devMode) {
  const now = Date.now();
  const startedAt = subHours(now,9);
  tasks = {
    work: {
      startedAt,
      pauses: [
        addHours(startedAt,1), addHours(startedAt,2)
      ],
      stoppedAt: addHours(startedAt,8),
    }
  }
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
