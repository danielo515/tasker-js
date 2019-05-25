/* eslint-disable no-console */
export function fakeTasker() {
    window.tk = {
        global: () => { },
        readFile: () => void 0,
        writeFile: () => void 0,
        flash: console.info,
        flashLong: console.info,
    };
}
