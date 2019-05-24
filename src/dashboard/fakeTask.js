import { subHours, addHours } from 'date-fns';

const now = Date.now();
const startedAt = subHours(now,9);

export const realOne = {'title':'work','startedAt':1558678978541,'pauses':[1558682273187,1558688205396],'stoppedAt':null};
export const fakeONe = {
    title: 'work',
    startedAt,
    pauses: [ addHours(startedAt,1), addHours(startedAt,2) ],
    stoppedAt: addHours(startedAt,8),
};

export const tasks = {
    work: realOne
};