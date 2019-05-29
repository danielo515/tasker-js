import { pauseTask, isPaused, startTask, stopTask } from './core/tasks';
import { differenceInMinutes } from 'date-fns';
import { ensureLocal, fail } from './util/fail';

main();
function main() {
    const taskName = ensureLocal('task', 'Please set local var. "task" with the task name');
    const action = ensureLocal('action', 'Please set a local var. "action" with one of: start,stop,pause');
    tk.flashLong(`About to ${action} task ${taskName}`);
    switch (action) {
    case 'start':
        startTask(taskName);
        break;
    case 'stop':
        stopTask(taskName);
        break;
    case 'pause':
        {
            const task = pauseTask(taskName);
            const { pauses } = task;
            if (isPaused(pauses)) {
                const a = pauses[pauses.length - 2];
                const b = pauses[pauses.length - 1];
                tk.flashLong('pause was ' + differenceInMinutes(b, a) + ' minutes long');
            }
        }
        break;
    default:
        fail('Unknown action: ' + action);
    }
    tk.exit();
}

export default main;