import React from 'react';
import { TaskStatus } from '../../core/tasks';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import PropTypes from 'prop-types';


const PlayPause = ({ status, onStart, onPause, inline }) => 
    <IconButton aria-label="Delete" color='primary' style={inline ? {padding: 0}:{}}>
        {status === TaskStatus.RUNNING
            ? <PauseIcon onClick={onPause}></PauseIcon>
            : <PlayIcon onClick={onStart}></PlayIcon>}
    </IconButton>;

PlayPause.propTypes={
    status: PropTypes.string.isRequired,
    onStart: PropTypes.func,
    onPause: PropTypes.func,
    inline: PropTypes.bool,
};


PlayPause.defaultProps = {
    inline: true,
};

export default PlayPause;