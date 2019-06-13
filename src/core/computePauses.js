import { mapInPairs } from '../util/mapInPairs';
import { differenceInMinutes } from 'date-fns';
export const computePauses = ({ pauses }) => {
    const now = Date.now();
    return ({
        pauseLengths: mapInPairs((a = now, b = now) => differenceInMinutes(a, b))(pauses),
    });
};
