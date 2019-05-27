
import TaskerAdapter from './taskerAdapter';
import lowDb from 'lowdb';
import { fakeTasker } from './fakeTasker';

if (!window.tk) {
    // browser fake mode
    fakeTasker();
}

export const db = lowDb(new TaskerAdapter(
    'Documents/tasks-db.json'
    , { defaultValue: { tasks: [] } }
));
