import moment from "moment";
import { ClockIn } from "./features/clockInsSlice";
import { TimesUnit, Todo } from "./features/todosSlice";
import { late3HourMoment } from "./utils";

const getCycleIdCore = (unit: TimesUnit, timestamp: number) => {
    switch (unit) {
        case 'daily':
            return late3HourMoment(timestamp).date();
        case 'weekly':
            return late3HourMoment(timestamp).isoWeek();
        case 'monthly':
            return late3HourMoment(timestamp).month();
        case 'quarterly':
            return late3HourMoment(timestamp).quarter();
        case 'yearly':
        default:
            return late3HourMoment(timestamp).year();
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

export const getLast30DaysSumScore = (todo: Todo, sortedByTimeClockIns: ClockIn[], today = late3HourMoment().date()) => {
    const length = sortedByTimeClockIns.length;
    if (length === 0) return 0;
    
    let sumScore = 0;

    for (let i = length - 1; i >= 0; i--) {
        const clockIn = sortedByTimeClockIns[i];
        if (today - late3HourMoment(clockIn.timeStamp).date() < 0) {
            continue;
        }

        if (today - late3HourMoment(clockIn.timeStamp).date() > 30) {
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
