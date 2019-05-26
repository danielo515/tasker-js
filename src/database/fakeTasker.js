/* eslint-disable no-console */


export function fakeTasker() {    
    if(process.env.NODE_ENV === 'test') return;
    const taskNames = ['work', 'eating', 'workout', 'programming'];
    const emptyTask = require('../emptyTask').emptyTask;
    
    window.tk = {
        global: () => { },
        readFile: () => {
            console.log('Database read');
            
            return  JSON.stringify({
                tasks: [
                    require('../../fixtures/fakeTask').running, ...taskNames.slice(1).map(emptyTask)
                ]
            });},
        writeFile: () => void 0,
        flash: console.info,
        flashLong: console.info,
    };
}