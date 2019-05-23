import safeParse from '../util/safeParse';
import LogErrors from "../util/errLog";

const readObj = name => safeParse(tk.global(name), {});
const saveJson = (name, value) =>
    tk.setGlobal(name, JSON.stringify(value))

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
        saveJson(name, task);
    } catch (error) {
        tk.flash(`Error updating task ${name}:\n ${error.toString}`);
    }
}

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