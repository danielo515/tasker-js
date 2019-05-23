import { subHours, addHours } from 'date-fns';

const now = Date.now();
const startedAt = subHours(now,9);

export const tasks = {
    work: {
        startedAt,
        pauses: [
            addHours(startedAt,1), addHours(startedAt,2)
        ],
        stoppedAt: addHours(startedAt,8),
    }
};