import React from 'react';
import { calculateRunningTime } from '../../../util/timeUtils';
import { TaskStatus } from '../../../core/tasks';
import Tick from '../Tick';

const formatAsClock = (...args) => args.map((n) => String(n).padStart('2', '0')).join(':');

export const makeCloudWatch = (status, { startedAt, stoppedAt, pauses }) => {
    switch (status) {
    case TaskStatus.STOPPED:
        return status;
    case TaskStatus.PAUSED:
        return calculateRunningTime(startedAt, stoppedAt, pauses, formatAsClock);
    case TaskStatus.RUNNING:
        return <Tick interval={1}>{() => calculateRunningTime(startedAt, stoppedAt, pauses, formatAsClock)}</Tick>;
    default: return '-';
    }
};
