
import TaskerAdapter from './taskerAdapter';
import lowDb from 'lowdb';
import { emptyTask } from '../emptyTask';
import { fakeTasker } from './fakeTasker';

let tasks;

if (!window.tk) {
    // browser fake mode
    const taskNames = ['work', 'eating', 'workout', 'programming'];
    fakeTasker();
    tasks = [require('../../fixtures/fakeTask').running, ...taskNames.slice(1).map(emptyTask)];
}

export const db = lowDb(new TaskerAdapter(
    'Documents/tasks-db.json'
    , { defaultValue: { tasks: tasks || [] } }
));
