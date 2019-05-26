// @ts-check
import { isOdd } from './dashboard/isOdd';
import {db} from './database/db';
import { emptyTask } from './emptyTask';

// const readObj = (name, fallback) => safeParse(tk.global(name), fallback);

/**
 * 
 * @typedef  Task
 * @property {String} title
 * @property {Number|null} startedAt
 * @property {Number|null} stoppedAt
 * @property {[Number]|[]} pauses
 */

export const isPaused = (pauses) => pauses.length && isOdd(pauses.length);

/**
 * @typedef {'running'|'stopped'} Status
 */
export const TaskStatus = {
    STOPPED: 'stopped',
    PAUSED: 'paused',
    RUNNING: 'running',
    NOT_STARTED: 'not-started'
};

/**
 * computes the status of a task based on its fields
 * @param {Task} param0 
 * @returns {Status}
 */
export const getTaskStatus = ({ startedAt, stoppedAt, pauses }) => {
    if (stoppedAt) return TaskStatus.STOPPED;
    if (startedAt && isPaused(pauses)) return TaskStatus.PAUSED;
    if (startedAt) return TaskStatus.RUNNING;
    return TaskStatus.NOT_STARTED;
};

export const saveTask = (value) => 
    db.get('tasks')
        .find({title:value.title})
        .assign(value)
        .write();

/**
 * Loads a task from the storage or returns a default one
 * @param {String} title the name of the task to load
 * @returns {Task} the task from memory or empty task if it was not found or invalid
 */
export const loadTask = title => 
{
    const task = db.get('tasks')
        .find({title})
        .value();    
    return task || emptyTask(title);
};

export const updateTask = updater => name => {
    try {
        const task = loadTask(name);
        const newFields = updater(task);
        const newTask = { ...task, ...newFields };
        saveTask(newTask);
        return newTask;
    } catch (error) {
        tk.flash(`Error updating task ${name}:\n ${error.toString}`);
    }
};

export const pauseTask = updateTask(({ pauses }) => (
    { pauses: pauses.concat(Date.now()) }
));

export const startTask = updateTask(() => ({ startedAt: Date.now(), stoppedAt: null }));
export const stopTask = updateTask(() => ({ stoppedAt: Date.now() }));