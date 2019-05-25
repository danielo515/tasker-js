/* eslint-env jest */
import { pauseTask, isPaused, startTask, stopTask } from '../src/tasks';
import { paused, running } from '../fixtures/fakeTask';
import './__mocks__/tasker';
import main from '../src/task-run';


jest.mock('../src/tasks');
pauseTask.mockReturnValue(paused);
isPaused.mockReturnValue(true);

const taskName = 'work';

const makeLocalMock = (action) => varName => {
    switch (varName) {
    case 'task': return taskName;
    case 'action':
    default: return action;
    }
};


describe('Execute work task', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call flashWith the proper minutes if there is a pause', () => {
        tk.local.mockImplementation(makeLocalMock('pause'));
        main();
        expect(pauseTask).toHaveBeenCalledWith(taskName);
        expect(tk.flashLong).toHaveBeenCalledWith('About to pause task work');
        expect(tk.flashLong).toHaveBeenCalledWith(expect.stringContaining(' minutes'));
        expect(tk.exit).toHaveBeenCalledTimes(1);
    });
    it('should call pause task', () => {
        tk.local.mockImplementation(makeLocalMock('pause'));
        pauseTask.mockReturnValueOnce(running);
        isPaused.mockReturnValueOnce(false);
        main();
        expect(pauseTask).toHaveBeenCalledWith(taskName);
        expect(tk.flashLong).toHaveBeenCalledWith('About to pause task work');
        expect(tk.flashLong).toHaveBeenCalledTimes(1);
        expect(tk.exit).toHaveBeenCalledTimes(1);
    });

    it('Should call start task', () => {
        tk.local.mockImplementation(makeLocalMock('start'));
        main();
        expect(startTask).toHaveBeenCalled();
        expect(tk.flashLong).toHaveBeenCalledWith('About to start task work');
        expect(tk.exit).toHaveBeenCalledTimes(1);
    });
    it('Should call stop task', () => {
        tk.local.mockImplementation(makeLocalMock('stop'));
        main();
        expect(stopTask).toHaveBeenCalled();
        expect(tk.flashLong).toHaveBeenCalledWith('About to stop task work');
        expect(tk.exit).toHaveBeenCalledTimes(1);
    });
    it('Should fail and exit on unknown task', () => {
        tk.local.mockImplementation(makeLocalMock('who-knows'));
        main();
        expect(stopTask).toHaveBeenCalledTimes(0);
        expect(tk.flashLong).toHaveBeenCalledWith('Unknown action: who-knows');
        expect(tk.exit).toHaveBeenCalledTimes(2); // our fake exit does not stop the execution, so here it is called twice
    });
});


