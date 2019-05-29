/* eslint-disable no-console */

const dbName = 'tasker-db';

export function fakeTasker() {    
    if(process.env.NODE_ENV === 'test') return;
    const taskNames = ['work', 'eating', 'workout', 'programming'];
    const emptyTask = require('../core/emptyTask').emptyTask;
    
    window.tk = {
        global: () => { },
        readFile: (filename) => {
            console.log('Database read', filename);
            
            return  localStorage.getItem(dbName) || JSON.stringify({
                tasks: [
                    require('../../fixtures/fakeTask').running, ...taskNames.slice(1).map(emptyTask)
                ]
            });
        },
        writeFile: (filename,data) => localStorage.setItem(dbName, data),
        flash: console.info,
        flashLong: console.info,
    };
}
