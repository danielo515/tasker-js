/* eslint-env jest */
import './__mocks__/tasker';
import { loadTask, updateTask, emptyTask } from '../src/tasks';

describe('Should task tasks =>', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load a Task', () => {
        const title = 'work';
        const expected = {
            title,
            startedAt: null,
            pauses: [],
            stoppedAt: null,
        };
        expect(loadTask(title)).toEqual(expected);
        expect(tk.global).toHaveBeenCalledWith('TASK_work');
    });

    it('update specific Task field', () => {
        const title = 'work';
        const startedAt = Symbol('startedAt');
        const updater = jest.fn().mockReturnValue({startedAt});
        const task = {
            title,
            startedAt,
            pauses: [],
            stoppedAt: null,
        };
        expect(updateTask(updater)(title)).toEqual(task);
        expect(updater).toHaveBeenCalledWith(emptyTask(title));
        expect(tk.global).toHaveBeenCalledWith('TASK_work');
        expect(tk.setGlobal).toHaveBeenCalledWith('TASK_work',JSON.stringify(task));
    });
});
