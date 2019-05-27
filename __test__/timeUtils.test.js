/* eslint-env jest */
import {calculatePauseTime, calculateRunningTime} from '../src/timeUtils';
import { addHours } from 'date-fns';

const hour = 3.6e6;
const now = Date.now();
const makePauses = (start,number) => 
    Array(number).fill(0).map((_,i) => addHours(start,i));

describe('Time calculation utils => ', () => {
    it('should calculate the pause time in MS', () => {
        const pauses = Array(4).fill(0).map((_,i) => addHours(now,i));        
        expect(calculatePauseTime(pauses)).toBe(2*hour);
    });

    it('calculate pauseTime should ignore non even rranges', () => {
        const d = Date.now();
        const pauses = Array(5).fill(0).map((_,i) => addHours(d,i));        
        expect(calculatePauseTime(pauses)).toBe(2*hour);
    });

    describe ('Calculate running time => ', () => {
    
        
        it('Running time 3 hours and no pauses', () => {
            const expected = '2 hours 59 min. 59 sec.';
            expect(calculateRunningTime(Date.now(),addHours(now,3),[])).toEqual(expected);
        });

        it('Running time 3 hours and 1 hour pause', () => {
            const expected = '1 hours 59 min. 59 sec.';
            const pauses = makePauses(now,2);
            expect(calculateRunningTime(Date.now(),addHours(now,3),pauses)).toEqual(expected);
        });
    });

});