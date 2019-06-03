
import { createStore, combineReducers } from 'redux';
import { db } from '../../database/db';
import { keyBy, mapValues } from 'lodash';
import { startTask, stopTask, TaskStatus, pauseTask, formatOutputTask } from '../../core/tasks';
import { computePauses } from '../../core/computePauses';
import { subscribe, getData } from '../../core/fb';

const initialState = {
    tasks: keyBy(db.get('tasks').value().map(formatOutputTask), 'title')
};

export const START = 'habit START';
export const LOAD = 'habit fb LOAD';
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

function tasksReducer(state = initialState, { type, payload: { task, tasks } = {} }) {
    switch (type) {
    case LOAD:
        return {
            ...state,
            ...mapValues(tasks, formatOutputTask)
        };
    case START:
        return { ...state, [task.title]: task };
    case STOP:
        return {
            ...state,
            [task.title]: {
                ...task,
                ...computePauses(task),
                status: TaskStatus.STOPPED
            }
        };
    case PAUSE:
        return {
            ...state,
            [task.title]: {
                ...task,
                ...computePauses(task),
                status: TaskStatus.PAUSED
            }
        };

    default: return state;
    }
}

export const OPEN_MODAL = 'ui OPEN_MODAL';
const initialUiState = { create_open: false };
export const createTaskModal = dispatch => () => dispatch(action(OPEN_MODAL));

function uiReducer(state = initialUiState, { type }) {
    switch (type) {
    case START: return { create_open: false };
    case OPEN_MODAL:
        return { create_open: true };
    default: return state;
    }
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    ui: uiReducer,
});

export default () => {
    const store = createStore(rootReducer, initialState);
    subscribe(
        task => store.dispatch(action(START, { task }))
    );
    getData(tasks => store.dispatch(action(LOAD, { tasks })));
    return store;
};