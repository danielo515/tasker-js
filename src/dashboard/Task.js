import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRunningTime } from '../timeUtils';
import { getTaskStatus } from '../tasks';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import  Button from '@material-ui/core/Button';
import { distanceInWordsToNow } from 'date-fns';

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

export const Task = ({ 
    title, 
    onStart, onStop, onPause,
    startedAt, stoppedAt, 
    lastPause, pauseLengths , pauses, 
}) => {

    const runningTime = startedAt ? calculateRunningTime(startedAt, stoppedAt, pauses) : '-';
    const status = getTaskStatus({ startedAt, stoppedAt, pauses });
    tk.flash('Loading task '+title);
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
                    <Row> {pauseLengths.join(' |-| ')} </Row>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    { status === 'running' 
                        ? <>
                        <Button onClick={onStop} color="primary" >Stop</Button>
                        <Button onClick={onPause} color="secondary" >Pause</Button>
                        </>
                        : status === 'paused' 
                            ? <Button onClick={onPause} color="primary" >Resume</Button> 
                            : <Button onClick={onStart} color="primary" >Start</Button> 
                    }
                </ExpansionPanelActions>
            </FullExpansion>
        </Root>
    );
};

Task.propTypes = {
    startedAt: PropTypes.number,
    stoppedAt: PropTypes.number,
    pauses: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
    lastPause: PropTypes.string,
    pauseLengths: PropTypes.arrayOf(PropTypes.string,),
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
};

Task.defaultProps = {
    pauseLengths: [],
    pauses: []
};

