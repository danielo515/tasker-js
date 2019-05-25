/* eslint-env jest */

global.tk = {
    setGlobal: jest.fn(),
    global: jest.fn(),
    local: jest.fn(),
    flashLong: jest.fn(),
    exit: jest.fn(),
};