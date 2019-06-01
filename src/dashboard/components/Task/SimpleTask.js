import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRunningTime } from '../../../util/timeUtils';
import { getTaskStatus, TaskStatus } from '../../../core/tasks';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import TimeRelative from '../TimeRelative';
import Tick from '../Tick';
import PlayPause from '../PlayPause';
import { makeCloudWatch } from './formatAsClock';


export const TaskItem = ({
    title,
    onStart, onStop, onPause,
    startedAt, stoppedAt,
    pauseLengths, pauses,
}) => {

    const status = getTaskStatus({ startedAt, stoppedAt, pauses });
    const isPaused = status === TaskStatus.PAUSED;
    const isRunning = status === TaskStatus.RUNNING;
    return (
        <ListItem>
            <ListItemText 
                primary={title} 
                secondary={makeCloudWatch(status,{ startedAt, stoppedAt, pauses })} >
            </ListItemText>
            <PlayPause {...{ status, onStart, onPause, isPaused, isRunning }}></PlayPause>
        </ListItem>
    );
};