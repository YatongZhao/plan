import moment from "moment";
import { ClockIn } from "./features/clockInsSlice";
import { TimesUnit, Todo } from "./features/todosSlice";

const getCycleIdCore = (unit: TimesUnit, timestamp: number) => {
    const transTimestamp = timestamp - 3 * 60 * 60 * 1000;
    switch (unit) {
        case 'daily':
            return moment(transTimestamp).date();
        case 'weekly':
            return moment(transTimestamp).isoWeek();
        case 'monthly':
            return moment(transTimestamp).month();
        case 'quarterly':
            return moment(transTimestamp).quarter();
        case 'yearly':
        default:
            return moment(transTimestamp).year();
    }
}

const getCycleId = (todo: Todo, clockIns: ClockIn[], index: number) => {
    return getCycleIdCore(todo.unit, clockIns[index].timeStamp);
}

export const getNextAddedScore = (todo: Todo, sortedByTimeClockIns: ClockIn[], index: number): number => {
    if (index === 0) return 5;

    if (getCycleId(todo, sortedByTimeClockIns, index) - getCycleId(todo, sortedByTimeClockIns, index - 1) <= 1) {
        return getNextAddedScore(todo, sortedByTimeClockIns, index - 1) + 1;
    }

    return 5;
}

export const getLast30DaysSumScore = (todo: Todo, sortedByTimeClockIns: ClockIn[], today = moment().date()) => {
    const length = sortedByTimeClockIns.length;
    if (length === 0) return 0;
    
    let sumScore = 0;

    for (let i = length - 1; i >= 0; i--) {
        const clockIn = sortedByTimeClockIns[i];
        if (today - moment(clockIn.timeStamp).date() < 0) {
            continue;
        }

        if (today - moment(clockIn.timeStamp).date() > 30) {
            break;
        } else {
            sumScore += getNextAddedScore(todo, sortedByTimeClockIns, i);
        }
    }

    return sumScore;
}

export const getLastCycleAddedScore = (todo: Todo, sortedByTimeClockIns: ClockIn[], timestamp: number) => {
    const length = sortedByTimeClockIns.length;
    if (length === 0) return 0;

    let sumScore = 0;

    for (let i = length - 1; i >= 0; i--) {
        const clockIn = sortedByTimeClockIns[i];
        if (clockIn.timeStamp > timestamp) continue;

        if (getCycleIdCore(todo.unit, timestamp) !== getCycleIdCore(todo.unit, clockIn.timeStamp)) {
            break;
        } else {
            sumScore += getNextAddedScore(todo, sortedByTimeClockIns, i);
        }
    }

    return sumScore;
}
