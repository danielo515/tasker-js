import safeParse from '../util/safeParse';
import LogErrors from '../util/errLog';

const readObj = (name, fallback) => safeParse(tk.global(name), fallback);
const saveJson = (name, value) =>
    tk.setGlobal(name, JSON.stringify(value));

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