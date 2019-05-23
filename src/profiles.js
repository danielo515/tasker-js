import TaskerJs from 'tasker-js-runner';
import {startTask} from './modules/timeManager';
// Construct Tasker JS and pass in mapping information as an Object
new TaskerJs({
    // Profile name: module
    'taskStart': startTask,
});