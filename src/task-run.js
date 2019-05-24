import { pauseTask, isPaused, startTask, stopTask } from './tasks';
import { differenceInMinutes } from 'date-fns';

const fail = msg => {
    tk.flashLong(msg);
    tk.exit();
};

const taskName = tk.local('task ');
if(!taskName) fail('Please set a local variable with task name called task');

const action = tk.local('action');
if(!action) fail('Please set a local variable with the action (start,stop,pause)');

switch (action) {
case 'start':
    startTask(taskName);
    break;
case 'stop':
    stopTask(taskName);
    break;
case 'pause':{
    const task = pauseTask('work');
    const {pauses} = task;
    if(isPaused(pauses)){
        const a = pauses[pauses.length-2];
        const b = pauses[pauses.length-1];
        tk.flashLong(differenceInMinutes(b,a) + ' minutes');
    }
}
    break;
default:
    fail('Unknown action: ' + action);
}

tk.exit();
