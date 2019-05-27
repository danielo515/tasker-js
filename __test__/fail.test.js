/* eslint-env jest */
import './__mocks__/tasker';
import {fail, ensureLocal} from '../src/util/fail';

describe ('Fail helper', () => {

    it('Should flash andd exit', () => {
        const FailMessage = Symbol('FailMessage');
        fail(FailMessage);
        expect(global.tk.flashLong).toHaveBeenCalledWith(FailMessage);
        expect(global.tk.exit).toHaveBeenCalled();
    });
});
describe ('ensure local helper', () => {
    beforeEach(() => jest.clearAllMocks() );

    it('Should return the variable if it exist', () => {
        const varValue = Symbol('varValue');
        tk.local.mockReturnValueOnce(varValue);
        const varName = Symbol('varName');
        const value = ensureLocal(varName);
        expect(tk.local).toHaveBeenCalledWith(varName);
        expect(value).toBe(varValue);
        expect(tk.exit).toHaveBeenCalledTimes(0);
    });

    it('Should fail and exit if the variable does not exist', () => {
        tk.local.mockReturnValueOnce('undefined');
        const varName = Symbol('varName');
        const errorMessage = Symbol('errorMessage');
        ensureLocal(varName,errorMessage);
        expect(tk.local).toHaveBeenCalledWith(varName);
        expect(tk.flashLong).toHaveBeenCalledWith(errorMessage);
        expect(tk.exit).toHaveBeenCalledTimes(1);
    });
});