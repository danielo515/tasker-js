import React from 'react';
import { distanceInWordsToNow, format, differenceInMinutes } from 'date-fns';
import styled from 'styled-components';
import { calculateRunningTime } from '../timeUtils';
import { mapInPairs } from '../../util/mapInPairs';
import { isEven } from './isEven';

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
    const status = stoppedAt ? 'finished' : !isEven(pauses.length) ? 'paused' : 'running';
    const lastPause = pauses.length ? distanceInWordsToNow(pauses[pauses.length - 1]) : null;
    const now = Date.now();
    const computedPauses =  mapInPairs((a = now, b = now) => differenceInMinutes(a, b) )(pauses);
    return (
        <Root>
            {title}
            <Row> Started: {distanceInWordsToNow(startedAt)} ago </Row>
            <Row> Status: {status} </Row>
            <Row>
                Finished: {stoppedAt ? distanceInWordsToNow(stoppedAt) : '-'}
            </Row>
            <Row> Running Time: {runningTime} </Row>
            {lastPause &&
                <Row>
                    Last pause: {lastPause} ago
                </Row>}
            <Row> { computedPauses .join(' |-| ') } </Row>
        </Root>
    );
};
