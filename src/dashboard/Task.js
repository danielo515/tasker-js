import React from 'react';
import { distanceInWordsToNow } from 'date-fns';
import styled from 'styled-components';
import { calculateRunningTime } from './timeUtils';

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

export const Task = ({ startedAt, stoppedAt, pauses, title }) => {
    
    const runningTime = calculateRunningTime(startedAt, stoppedAt, pauses);
    return (
        <Root>
            {title}
            <Row>
                Started: {distanceInWordsToNow(startedAt)} ago
            </Row>
            <Row>
                Status: {stoppedAt ? 'finished' : 'running'}
            </Row>
            <Row>
               Finished: { stoppedAt ? distanceInWordsToNow(stoppedAt) : '-'}
            </Row>
            <Row>
                Running Time: {runningTime}
            </Row>

        </Root>
    );
};
