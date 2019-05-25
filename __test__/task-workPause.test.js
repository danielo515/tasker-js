/* eslint-env jest */
import { pauseTask, isPaused } from '../src/tasks';
import { paused } from '../fixtures/fakeTask';
import './__mocks__/tasker';


jest.mock('../src/tasks');
pauseTask.mockReturnValue(paused);
isPaused.mockReturnValue(true);


describe('Execute work task', () => {
    require('../src/task-workPause');
    it('should call flashWith the proper minutes if there is a pause', () => {
        expect(pauseTask).toHaveBeenCalled();
        expect(tk.flashLong).toHaveBeenCalledWith(expect.stringContaining(' minutes'));
    });

});