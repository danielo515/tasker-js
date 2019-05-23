import React from 'react';
import { distanceInWords, distanceInWordsToNow, differenceInMilliseconds, subMilliseconds } from 'date-fns';
import styled from 'styled-components';
import { format } from 'path';

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

const calculateRunningTime = (start,stop,pauses) =>{
   let discount = 0;
   for (let i = 0, l = pauses.length; (i+1) < l; i+=2) {
    discount += differenceInMilliseconds(pauses[i+1], pauses[i]); // not sure why I have to invert this
   };   

   return distanceInWords(
       start, 
       subMilliseconds(stop,discount)
       ,{includeSeconds: true}
    );
}

export const Task = ({ startedAt, stoppedAt, pauses, title }) => {
    
    const runningTime = calculateRunningTime(startedAt, stoppedAt,pauses)
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
               Finished: {distanceInWordsToNow(stoppedAt)}
            </Row>
            <Row>
                Running Time: {runningTime}
            </Row>

        </Root>
    )
};
