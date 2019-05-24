import React from 'react';
import { distanceInWordsToNow, format, differenceInMinutes } from 'date-fns';
import styled from 'styled-components';
import { calculateRunningTime } from '../timeUtils';
import { mapInPairs } from '../../util/mapInPairs';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1em;
`;
const Row = styled.p`
  padding: 0 0 0 15px;
  margin: 0;
`;

const isEven = x => x%2 === 0;

export const Task = ({ startedAt, stoppedAt, pauses, title }) => {
    
    const runningTime = calculateRunningTime(startedAt, stoppedAt, pauses);
    const status = stoppedAt ? 'finished' : !isEven(pauses.length)  ? 'paused' : 'running';
    return (
        <Root>
            {title}
            <Row>
                Started: {distanceInWordsToNow(startedAt)} ago
            </Row>
            <Row>
                Status: {status}
            </Row>
            <Row>
               Finished: { stoppedAt ? distanceInWordsToNow(stoppedAt) : '-'}
            </Row>
            <Row>
                Running Time: {runningTime}
            </Row>
            {mapInPairs((a,b) => differenceInMinutes(a,b||Date.now()))(pauses).join(' |-| ') }
        </Root>
    );
};
