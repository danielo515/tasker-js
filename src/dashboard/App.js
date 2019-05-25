// @ts-check
import React from 'react';
import './App.css';
import { Task } from './Task';
import {db} from '../database/db';
import Paper  from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const tasks = db.get('tasks').value();

function App() {
    return (
        <Paper className='App-header'>
            {!tasks.length ? <Typography> No tasks yet</Typography>
                :
                tasks.map(task =>
                    <Task {...task} key={task.title}></Task>
                )}
        </Paper>
    );
}
// function App() {
//     return (
//         <Grid container spacing={2} className="App-header">
//             {tasks.map(task =>
//                 <Grid item key={task.title}>
//                     <Task {...task}></Task>
//                 </Grid>)}
//         </Grid>
//     );
// }

export default App;
