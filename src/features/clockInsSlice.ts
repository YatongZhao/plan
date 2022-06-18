import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { v4 } from "uuid";
import { RootState } from "../store";
import { extractAdapterReducer } from "../utils";
import { TimesUnit } from "./todosSlice";

export type ClockIn = {
  id: string;
  todoId: string;
  timeStamp: number;
}
const clockInsAdapter = createEntityAdapter<ClockIn>();

const clockInsSlice = createSlice({
  name: 'clockIns',
  initialState: clockInsAdapter.getInitialState(),
  reducers: {
    ...extractAdapterReducer(clockInsAdapter),
  }
});

export const clockInsActions = clockInsSlice.actions;
export const clockInsSelectors = clockInsAdapter.getSelectors((state: RootState) => state.clockIns);
export default clockInsSlice.reducer;

export const ByTodoIdSelector = (todoId: string, state: RootState) => {
  return clockInsSelectors
    .selectAll(state)
    .filter(clockIn => clockIn.todoId === todoId);
}

const getIndexInCycle = (unit: TimesUnit, timeStamp?: number) => {
  switch (unit) {
    case 'daily':
      return moment(timeStamp).date();
    case 'weekly':
      return moment(timeStamp).weeksInYear();
    case 'monthly':
      return moment(timeStamp).month();
    case 'quarterly':
      return moment(timeStamp).quarter();
    case 'yearly':
    default:
      return moment(timeStamp).year();
  };
}

export const getTimes = (
  clockIns: ClockIn[],
  targetNumber: number,
  unit: TimesUnit,
  unitNumber: number
): [number[], number[]] => {
  let result: [number[], number[]] = [[], []];
  if (clockIns.length === 0) return result;

  clockIns.sort((a, b) => a.timeStamp - b.timeStamp);

  const base = clockIns[0];

  clockIns.forEach(clockIn => {
    const index = ~~((getIndexInCycle(unit, clockIn.timeStamp) - getIndexInCycle(unit, base.timeStamp)) / unitNumber);
    if (index > targetNumber) {
      result[1][index] = (result[1][index] ?? 0) + 1;
    } else {
      result[0][index] = (result[0][index] ?? 0) + 1;
    }
  });

  return [
    result[0].filter(Boolean),
    result[1].filter(Boolean)
  ];
}

export const getGoByCycleNumber = (clockIns: ClockIn[], unit: TimesUnit, unitNumber: number) => {
  if (clockIns.length === 0) return 0;
  clockIns.sort((a, b) => a.timeStamp - b.timeStamp);
  
  return (
    getIndexInCycle(unit, clockIns[clockIns.length - 1].timeStamp)
    - getIndexInCycle(unit, clockIns[0].timeStamp)
  ) / unitNumber + 1;
}

export const generateClockIn = (todoId: string, timeStamp: number) => ({
  id: v4(),
  todoId,
  timeStamp,
});
