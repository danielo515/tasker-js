import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRunningTime } from '../../util/timeUtils';
import { getTaskStatus, TaskStatus } from '../../tasks';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import TimeRelative from './TimeRelative';


const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5em 1em;
    padding-bottom: 0;
`;
const Row = styled(({ className, children, label }) =>
    <div className={className}>
        <Typography variant='subtitle1' color='textPrimary'> {label} </Typography>
        <Typography variant='subtitle2' color='textSecondary'> {children} </Typography>
    </div>
)`
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

const Colum = styled.div`
  flex-basis: 50%;
`;

const FullExpansion = styled(ExpansionPanel)`
width: 100%;
padding-bottom: 0;
`;

const makeRunningText = (status, { startedAt, stoppedAt, pauses }) => {
    switch (status) {
    case TaskStatus.STOPPED:
    case TaskStatus.PAUSED:
        return calculateRunningTime(startedAt, stoppedAt, pauses);
    case TaskStatus.RUNNING:
        return <TimeRelative startedAt={startedAt} />;
    default: return '-';
    }
};

export const Task = ({
    title,
    onStart, onStop, onPause,
    startedAt, stoppedAt,
    lastPause, pauseLengths, pauses,
}) => {

    const status = getTaskStatus({ startedAt, stoppedAt, pauses });
    const runningTime = makeRunningText(status, { startedAt, stoppedAt, pauses });
    tk.flash('Loading task ' + title);
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
                    <Row label=' Started' >{startedAt ? <TimeRelative startedAt={startedAt} /> : '-'}</Row>
                    <Row label=' Finished' > {stoppedAt ? <TimeRelative startedAt={stoppedAt} /> : '-'} </Row>
                    <Row label=' Running' >{runningTime} </Row>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <Row label='Last pause' >  {lastPause ? lastPause + ' ago' : '-'} </Row>
                    <Row> {pauseLengths.join(' |-| ')} </Row>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    {status === 'running'
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
    pauseLengths: PropTypes.arrayOf(PropTypes.string),
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
};

Task.defaultProps = {
    pauseLengths: [],
    pauses: []
};

