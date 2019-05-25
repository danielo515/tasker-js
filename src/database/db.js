// @ts-check

import TaskerAdapter from './taskerAdapter';
import lowDb from 'lowdb';
import { emptyTask } from '../tasks';


let tasks;
if (!window.tk) {
    // browser fake mode
    const taskNames = ['work', 'eating', 'workout', 'programming'];
    window.tk = {
        global: () => { },
        readFile: () => void 0,
        writeFile: () => void 0,
        flash: console.info,
        flashLong: console.info,
    };
    tasks = [require('../../fixtures/fakeTask').running, ...taskNames.slice(1).map(emptyTask)];
}

export const db = lowDb(new TaskerAdapter(
    'Documents/tasks-db.json'
    , { defaultValue: { tasks: tasks || [] } }
));