import React from 'react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';
import styled from 'styled-components';
import { calculateRunningTime } from '../timeUtils';
import { mapInPairs } from '../util/mapInPairs';
import { getTaskStatus } from '../tasks';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1em;
`;
const Row = styled.p`
  padding: 0 0 0 15px;
  flex-basis: 33.33%;
  margin: 0;
`;

const Header = styled.span`
    text-transform: capitalize;
    color: green;
`;

const SecondaryHeader = styled.span`
  color: grey;
`;

const Colum = styled.span`
  flex-basis: 50%;
`;

const FullExpansion = styled(ExpansionPanel)`
width: 100%;
padding-bottom: 0;
`;

export const Task = ({ startedAt, stoppedAt, pauses, title }) => {

    const runningTime = startedAt ? calculateRunningTime(startedAt, stoppedAt, pauses) : '-';
    const status = getTaskStatus({ startedAt, stoppedAt, pauses });
    const lastPause = pauses.length ? distanceInWordsToNow(pauses[pauses.length - 1]) : null;
    const now = Date.now();
    const computedPauses = mapInPairs((a = now, b = now) => differenceInMinutes(a, b))(pauses);
    return (
        <Root>
            <FullExpansion>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                >
                    <Colum>
                        <Header>{title}</Header>
                    </Colum>
                    <Colum>
                        <SecondaryHeader> {status} </SecondaryHeader>
                    </Colum>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Row> Started: {startedAt ? distanceInWordsToNow(startedAt) + ' ago' : '-'}</Row>
                    <Row> Finished: {stoppedAt ? distanceInWordsToNow(stoppedAt) : '-'} </Row>
                    <Row> Running: {runningTime} </Row>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    {lastPause &&
                        <Row> Last pause: {lastPause} ago </Row>
                    }
                    <Row> {computedPauses.join(' |-| ')} </Row>
                </ExpansionPanelDetails>
            </FullExpansion>
        </Root>
    );
};

Task.propTypes = {
    startedAt: PropTypes.string.number,
    stoppedAt: PropTypes.string.number,
    pauses: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
};

