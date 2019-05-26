
import { createStore, combineReducers } from 'redux'; 
import {db} from '../database/db';
import { keyBy } from 'lodash';
import { startTask, stopTask, status, pauseTask } from '../tasks';
import { mapInPairs } from '../util/mapInPairs';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';

const initialState = { 
    tasks: keyBy(db.get('tasks').value(),'title')
};

export const START = 'habit START';
export const STOP = 'habit STOP';
export const PAUSE = 'habit PAUSE';

const action = (type, payload) => ({ type, payload });

// This actions are performing side effects...
export const start = dispatch => title => () => {
    return dispatch(action(
        START, { task: startTask(title) }
    ));
};
export const stop = dispatch => title => () => {
    return dispatch(action(
        STOP, { task: stopTask(title) }
    ));
};
export const pause = dispatch => title => () => {
    return dispatch(action(
        PAUSE, { task: pauseTask(title) }
    ));
};

const computePauses = ({pauses}) => {
    const now = Date.now();
    return ({
        pauseLengths: mapInPairs((a = now, b = now) => differenceInMinutes(a, b))(pauses),
        lastPause: pauses.length ? distanceInWordsToNow(pauses[pauses.length - 1]) : null,
    });
};

function tasksReducer(state = initialState,{type, payload:{task} = {}}) {
    switch (type) {
    case START:
        return {...state, [task.title]:task};
    case STOP:
        return {...state, 
            [task.title]:{
                ...task,
                ...computePauses(task),
                status: status.STOPPED
            }
        };
    case PAUSE:
        return { ...state, 
            [task.title]:{
                ...task,
                ...computePauses(task),
                status: status.PAUSED
            }
        };
    
    default: return state;
    }
}
 
const rootReducer = combineReducers({ 
    tasks: tasksReducer
}); 
 
export default () => createStore(rootReducer, initialState);