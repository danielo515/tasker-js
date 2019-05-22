import safeParse from '../util/safeParse';
import LogErrors from "../util/errLog";
const pauseTask = name => {
    const varName = `TASK_${name}_PAUSE`;
    const current = safeParse(tk.global(varName),[]);
    current.push(Date.now());
    tk.setGlobal(`TASK_${name}_PAUSE`,JSON.stringify(current))
};

window.pauseTask = LogErrors(pauseTask);