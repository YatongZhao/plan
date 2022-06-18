import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../store";
import { extractAdapterReducer } from "../utils";
import { clockInsSelectors } from "./clockInsSlice";

export type TimesUnit = 'daily'|'weekly'|'monthly'|'quarterly'|'yearly';

export type Todo = {
  id: string;

  title: string;
  startAt: number;
  endAt: number | null;

  timesNumber: number;
  unitNumber: number;
  unit: TimesUnit;

  targetUnitNumber: number;

  lastClockInStamp: number | null;

  isDone: boolean;
}
const todosAdapter = createEntityAdapter<Todo>();

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    ...extractAdapterReducer(todosAdapter),
  },
});

export const todosActions = todosSlice.actions;
export const todosSelectors = todosAdapter.getSelectors((state: RootState) => state.todos);
export default todosSlice.reducer;

export const undoneTodosSelector = (state: RootState) => {
  return todosSelectors
    .selectAll(state)
    .filter(todo => !todo.isDone);
}

export const doneTodosSelector = (state: RootState) => {
  return todosSelectors
    .selectAll(state)
    .filter(todo => todo.isDone);
}

/**
 * 判断TODO是否处于激活状态：
 * 目前是根据当天是否有打卡判断
 * 
 * 最少
 *      - 2次/1周
 * 期望值
 *      - 3次/1周
 * 最多
 *      - 1次/1天
 *      - 4次/1周
 * 
 * 少于最少
 *      - 任务失败
 *      - 无事发生 X
 * 多于最多
 *      - 禁止打卡 加大打卡难度
 *      - 大幅减少加分
 * 
 * 任务失败
 * 任务减分
 * 
 * @param todo 
 * @returns 
 */
export const isTodoActive = (todo: Todo) => {
  return true;
  if (todo.lastClockInStamp === null) return true;

  if (moment(todo.lastClockInStamp).date() !== moment().date()) {
    return true;
  }

  return false;
}

export const isCurrentWorkDone = (todo: Todo) => {
  return 
}

export const activeTodosSelector = (state: RootState) => {
  return todosSelectors
    .selectAll(state)
    .filter(isTodoActive);
}

export const getTimeSum = (todo: Todo) => todo.targetUnitNumber * todo.timesNumber;
export const getBaseTime = (todo: Todo) => todo.timesNumber;
export const getTargetDateNumber = (todo: Todo) => todo.targetUnitNumber * todo.unitNumber;