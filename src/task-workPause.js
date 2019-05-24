import { pauseTask } from './tasks';
import { isEven } from './dashboard/isEven';
import { differenceInMinutes } from 'date-fns';


const task = pauseTask('work');
const {pauses} = task;
if(isEven(pauses.length)){
    const b = pauses[pauses.length-1];
    const a = pauses[pauses.length-2];
    tk.flashLong(differenceInMinutes(b,a) + ' minutes');
}
tk.exit();