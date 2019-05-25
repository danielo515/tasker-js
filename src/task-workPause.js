import { pauseTask, isPaused } from './tasks';
import { differenceInMinutes } from 'date-fns';


const task = pauseTask('work');
const {pauses} = task;

if(isPaused(pauses)){
    const a = pauses[pauses.length-2];
    const b = pauses[pauses.length-1];
    tk.flashLong(differenceInMinutes(b,a) + ' minutes');
}
tk.exit();