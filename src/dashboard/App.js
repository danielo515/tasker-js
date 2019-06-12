// @ts-check
import React from 'react';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import './App.css';
import Form from './createForm.container';
import { Task } from './components/Task/Task';

import { map } from 'lodash';

const FabRight = styled(Fab)`
  && {
    bottom: 1rem;
    right: 1rem;
    position: fixed ;
  }
`;

function App({ tasks, start, stop, pause, openModal }) {
    return (
        <Paper className='App'>
            {
                map(tasks, task =>
                    <Task {...task}
                        key={task.title}
                        onStart={start}
                        onStop={stop}
                        onPause={pause}
                    ></Task>
                )}
            <FabRight color='primary' aria-label='Add' size='small' >
                <AddIcon onClick={openModal}/>
            </FabRight>
            <Form ></Form>
        </Paper>
    );
}
// function App() {
//     return (
//         <Grid container spacing={2} className='App-header'>
//             {tasks.map(task =>
//                 <Grid item key={task.title}>
//                     <Task {...task}></Task>
//                 </Grid>)}
//         </Grid>
//     );
// }

export default App;
