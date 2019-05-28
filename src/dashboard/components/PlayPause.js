import React from 'react';
import { TaskStatus } from '../../tasks';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const PlayPause = (status, { onStart, onPause }) => 
    <IconButton aria-label="Delete" color='primary'>
        {status === TaskStatus.RUNNING
            ? <PauseIcon onClick={onPause}></PauseIcon>
            : <PlayIcon onClick={onStart}></PlayIcon>}
    </IconButton>;

export default PlayPause;