
import { createStore, combineReducers } from 'redux'; 
import {db} from '../database/db';
import { keyBy } from 'lodash';

const initialState = keyBy(db.get('tasks').value(),'title');

function tasksReducer(state = initialState,{type, payload:{task} = {}}) {
    switch (type) {
    case 'update':
        return {...state, [task.title]:task};
    
    default: return state;
    }
}
 
const rootReducer = combineReducers({ 
    tasks: tasksReducer
}); 
 
export default () => createStore(rootReducer, initialState);