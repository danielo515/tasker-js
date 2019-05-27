/* eslint-env jest */

global.tk = {
    setGlobal: jest.fn(),
    global: jest.fn(),
    local: jest.fn(),
    flashLong: jest.fn(),
    flash: jest.fn(),
    exit: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
};