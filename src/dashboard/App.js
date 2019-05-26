// @ts-check
import React from 'react';
import './App.css';
import { Task } from './Task';
import Paper  from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { map } from 'lodash';

function App({ tasks, start, stop, pause }) {    
    return (
        <Paper className='App-header'>
            {
                map(tasks,task =>
                    <Task {...task} 
                        key={task.title} 
                        onStart={start(task.title)}
                        onStop={stop(task.title)}
                        onPause={pause(task.title)}
                    ></Task>
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
