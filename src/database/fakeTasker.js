/* eslint-disable no-console */

const dbName = 'tasker-db';

export function fakeTasker() {    
    if(process.env.NODE_ENV === 'test') return;
    
    window.tk = {
        global: () => { },
        readFile: (filename) => {
            console.log('Database read', filename);
            
            return  localStorage.getItem(dbName) || JSON.stringify({
                tasks: [ ]
            });
        },
        writeFile: (filename,data) => localStorage.setItem(dbName, data),
        flash: console.info,
        flashLong: console.info,
    };
}
