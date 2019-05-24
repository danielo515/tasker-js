/* eslint-env jest */
import { pauseTask } from '../src/tasks';
import { running } from '../fixtures/fakeTask';   

global.tk = {
    flashLong: jest.fn(),
    exit: jest.fn()
};

jest.mock('../src/tasks');
pauseTask.mockReturnValue(running);

describe ('Execute work task', () => {
    require('../src/task-workPause');
    it('should call flashWith the proper minutes if there is a pause', () => {
        expect(tk.flashLong).toHaveBeenCalledWith('98 minutes');
    }); 

});