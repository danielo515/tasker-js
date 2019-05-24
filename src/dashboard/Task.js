import React from 'react';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';
import styled from 'styled-components';
import { calculateRunningTime } from '../timeUtils';
import { mapInPairs } from '../../util/mapInPairs';
import { getTaskStatus } from '../tasks';

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

const Header = styled.h2`
text-transform: capitalize;
color: green;
`;


export const Task = ({ startedAt, stoppedAt, pauses, title }) => {

    const runningTime = calculateRunningTime(startedAt, stoppedAt, pauses);
    const status = getTaskStatus({startedAt, stoppedAt, pauses});
    const lastPause = pauses.length ? distanceInWordsToNow(pauses[pauses.length - 1]) : null;
    const now = Date.now();
    const computedPauses =  mapInPairs((a = now, b = now) => differenceInMinutes(a, b) )(pauses);
    return (
        <Root>
            <Header>{title}</Header>
            <Row> Status: {status} </Row>
            <Row> Started: { startedAt ? distanceInWordsToNow(startedAt) + ' ago' : '-'}</Row>
            <Row> Finished: {stoppedAt ? distanceInWordsToNow(stoppedAt) : '-'} </Row>
            <Row> Running Time: {runningTime} </Row>
            {lastPause &&
                <Row> Last pause: {lastPause} ago </Row>
            }
            <Row> { computedPauses .join(' |-| ') } </Row>
        </Root>
    );
};
