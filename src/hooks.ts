import moment from "moment";
import { useCallback } from "react";
import { ByTodoIdSelector, ClockIn, clockInsActions, clockInsSelectors, generateClockIn } from "./features/clockInsSlice";
import { TimesUnit, todosActions, todosSelectors } from "./features/todosSlice";
import { getLast30DaysSumScore, getLastCycleAddedScore } from "./score.ver2";
import { useAppDispatch, useAppSelector } from "./store";
import { late3HourMoment } from "./utils";

export const useClockInHandler = (todoId: string) => {
  const dispatch = useAppDispatch();

  const handleClockIn = useCallback(() => {
    const timeStamp = Date.now();
    dispatch(clockInsActions.upsertOne(generateClockIn(todoId, timeStamp)));

    dispatch(todosActions.updateOne({
      id: todoId,
      changes: {
        lastClockInStamp: timeStamp,
      }
    }));
  }, [todoId, dispatch]);

  return handleClockIn;
}

export const useDeleteTodo = (todoId: string) => {
  const dispatch = useAppDispatch();
  const clockIns = useAppSelector(ByTodoIdSelector.bind(null, todoId));

  const deleteTodo = useCallback(() => {
    dispatch(todosActions.removeOne(todoId));
    dispatch(clockInsActions.removeMany(clockIns.map(clockIn => clockIn.id)));
  }, [todoId, clockIns, dispatch]);

  return deleteTodo;
}

export const useCurrentClockIns = (todoId: string, unitNumber: number, unit: TimesUnit) => {
  const clockIns = useAppSelector(ByTodoIdSelector.bind(null, todoId));

  let currentClockIns: ClockIn[];

  if (unit === 'weekly') {
    const isoWeek = late3HourMoment().isoWeek();
    currentClockIns = clockIns.filter(clockIn => {
      return late3HourMoment(clockIn.timeStamp).isoWeek() === isoWeek;
    });
  } else if (unit === 'daily') {
    const currentDate = late3HourMoment().date();
    currentClockIns = clockIns.filter(clockIn => {
      return late3HourMoment(clockIn.timeStamp).date() === currentDate;
    });
  } else {
    currentClockIns = [];
  }

  return currentClockIns;
}

export const useClockIns = (todoId: string) => {
  return useAppSelector(ByTodoIdSelector.bind(null, todoId));
}

export const useLastCycleAddedScoreSum = () => {
  const todos = useAppSelector(todosSelectors.selectAll);
  const clockIns = useAppSelector(clockInsSelectors.selectAll);

  return todos.reduce((pre, current) => {
    return pre + getLastCycleAddedScore(
      current,
      clockIns.filter(clockIn => clockIn.todoId === current.id).sort((a, b) => a.timeStamp - b.timeStamp),
      Date.now());
  }, 0);
}

export const useLast30DaysCycleAddedScore = () => {
  const todos = useAppSelector(todosSelectors.selectAll);
  const clockIns = useAppSelector(clockInsSelectors.selectAll);

  return new Array(10).fill(0).map((_, i) => {
    return [
      todos.reduce((pre, current) => {
        return pre + getLastCycleAddedScore(
          current,
          clockIns.filter(clockIn => clockIn.todoId === current.id).sort((a, b) => a.timeStamp - b.timeStamp),
          Date.now() - 24 * 60 * 60 * 1000 * i);
      }, 0),
      i,
    ];
  });
}

export const useLast30DaysSumScoreSum = () => {
  const todos = useAppSelector(todosSelectors.selectAll);
  const clockIns = useAppSelector(clockInsSelectors.selectAll);

  return todos.reduce((pre, current) => {
    return pre + getLast30DaysSumScore(current, clockIns.filter(clockIn => clockIn.todoId === current.id).sort((a, b) => a.timeStamp - b.timeStamp));
  }, 0);
}

export const useLast30Days30DaysSumScoreSum = () => {
  const todos = useAppSelector(todosSelectors.selectAll);
  const clockIns = useAppSelector(clockInsSelectors.selectAll);

  return new Array(10).fill(0).map((_, i) => {
    return [
      todos.reduce((pre, current) => {
        return pre + getLast30DaysSumScore(
          current,
          clockIns.filter(clockIn => clockIn.todoId === current.id).sort((a, b) => a.timeStamp - b.timeStamp),
          late3HourMoment().date() - i,
        );
      }, 0),
      i,
    ];
  });
}