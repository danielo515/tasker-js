// @ts-check
import safeParse from '../util/safeParse';
import LogErrors from '../util/errLog';
import { isOdd } from './dashboard/isOdd';

const readObj = (name, fallback) => safeParse(tk.global(name), fallback);
const saveJson = (name, value) => tk.setGlobal(name, JSON.stringify(value));

/**
 * 
 * @typedef  Task
 * @property {String} title
 * @property {Number|null} startedAt
 * @property {Number|null} stoppedAt
 * @property {[Number]} pauses
 */

export const isPaused = (pauses) => pauses.length && isOdd(pauses.length);

/**
 * computes the status of a task based on its fields
 * @param {Task} param0 
 * @returns {'stopped'|'paused'|'running'|'not-started'}
 */
export const getTaskStatus = ({startedAt,stoppedAt,pauses}) => 
{
    if(stoppedAt) return 'stopped';
    if(startedAt && isPaused(pauses)) return 'paused';
    if(startedAt) return 'running';
    return 'not-started';
};


/**
 * Loads a task from the storage or returns a default one
 * @param {String} name the name of the task to load
 * @returns {Task} the task from memory or empty task if it was not found or invalid
 */
export const loadTask = name => readObj(
    `TASK_${name}`,
    {
        title: name,
        startedAt: null,
        pauses: [],
        stoppedAt: null,
    });

export const updateTask = field => updater => name => {
    try {
        const task = loadTask(name);        
        task[field] = updater(task[field]);// pass the current value for convenience 
        saveJson(`TASK_${name}`, task);
        return task;
    } catch (error) {
        tk.flash(`Error updating task ${name}:\n ${error.toString}`);
    }
};

export const pauseTask = updateTask('pauses')(
    current => {
        current.push(Date.now());
        return current;
    });

export const startTask = updateTask('startedAt')(() => Date.now());
export const stopTask = updateTask('stoppedAt')(() => Date.now());

window.pauseTask = LogErrors(pauseTask);
window.startTask = LogErrors(startTask);
window.stopTask = LogErrors(stopTask);