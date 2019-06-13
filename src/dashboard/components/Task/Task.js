import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculateRunningTime } from '../../../util/timeUtils';
import { getTaskStatus, TaskStatus } from '../../../core/tasks';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import TimeRelative from '../TimeRelative';
import Tick from '../Tick';
import { makeCloudWatch } from './formatAsClock';


const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1em;
    padding-bottom: 0;
`;
const InfoColumn = styled(({ className, children, label }) =>
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

const HeaderCol = styled.div`
  padding: 5px;
  flex-basis: 50%;
  /* The parent is flex, so that's why we have a flex basis to make it grow.
  And the properties below is to arrange the children*/
  display: flex;
  justify-content: space-between;
`;

const FullExpansion = styled(ExpansionPanel)`
width: 100%;
padding-bottom: 0;
`;

const PanelActions = styled(ExpansionPanelActions)`
 &&{ justify-content: center;}
`;

const makeRunningText = (status, { startedAt, stoppedAt, pauses }) => {
    switch (status) {
    case TaskStatus.STOPPED:
    case TaskStatus.PAUSED:
        return calculateRunningTime(startedAt, stoppedAt, pauses);
    case TaskStatus.RUNNING:
        return <Tick interval={5}>{() => calculateRunningTime(startedAt, stoppedAt, pauses)}</Tick>;
    default: return '-';
    }
};

export const Task = ({
    title,
    onStart, onStop, onPause,
    startedAt, stoppedAt,
    pauseLengths, pauses,
}) => {

    const status = getTaskStatus({ startedAt, stoppedAt, pauses });
    // tk.flash('Loading task ' + title);
    return (
        <Root>
            <FullExpansion elevation={1} square TransitionProps={{ unmountOnExit: true }} >
                <ExpansionPanelSummary
                    
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                >
                    <HeaderCol>
                        <Header>{title}</Header>
                    </HeaderCol>
                    <HeaderCol>
                        <SecondaryHeader> {makeCloudWatch(status,{ startedAt, stoppedAt, pauses })} </SecondaryHeader>
                    </HeaderCol>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <InfoColumn label=' Started' >{startedAt ? <TimeRelative startedAt={startedAt} /> : '-'}</InfoColumn>
                    <InfoColumn label=' Finished' > {stoppedAt ? <TimeRelative startedAt={stoppedAt} /> : '-'} </InfoColumn>
                    <InfoColumn label=' Running' >{makeRunningText(status, { startedAt, stoppedAt, pauses })}</InfoColumn>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <InfoColumn label='Last pause' >  {pauses.length ? <TimeRelative startedAt={pauses[pauses.length - 1]} suffix=' ago' /> : '-'} </InfoColumn>
                    <InfoColumn> {pauseLengths.join(' |-| ')} </InfoColumn>
                </ExpansionPanelDetails>
                <PanelActions>
                    {status === 'running'
                        ? <>
                            <Button onClick={onStop} color="primary" >Stop</Button>
                            <Button onClick={onPause} color="secondary" >Pause</Button>
                        </>
                        : status === 'paused'
                            ? <Button onClick={onPause} color="primary" >Resume</Button>
                            : <Button onClick={onStart} color="primary" >Start</Button>
                    }
                </PanelActions>
            </FullExpansion>
        </Root>
    );
};

Task.propTypes = {
    startedAt: PropTypes.number,
    stoppedAt: PropTypes.number,
    pauses: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
    pauseLengths: PropTypes.arrayOf(PropTypes.number),
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
};

Task.defaultProps = {
    pauseLengths: [],
    pauses: []
};

