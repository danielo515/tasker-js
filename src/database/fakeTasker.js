/* eslint-disable no-console */
export function fakeTasker() {    
    if(process.env.NODE_ENV === 'test') return;
    window.tk = {
        global: () => { },
        readFile: () => void 0,
        writeFile: () => void 0,
        flash: console.info,
        flashLong: console.info,
    };
}
