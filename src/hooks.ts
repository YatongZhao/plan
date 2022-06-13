import moment from "moment";
import { useCallback } from "react";
import { ByTodoIdSelector, ClockIn, clockInsActions, generateClockIn } from "./features/clockInsSlice";
import { TimesUnit, todosActions } from "./features/todosSlice";
import { useAppDispatch, useAppSelector } from "./store";

export const useClockInHandler = (todoId: string) => {
  const dispatch = useAppDispatch();

  const timeStamp = Date.now();
  const handleClockIn = useCallback(() => {
    dispatch(clockInsActions.upsertOne(generateClockIn(todoId, timeStamp)));

    dispatch(todosActions.updateOne({
      id: todoId,
      changes: {
        lastClockInStamp: timeStamp,
      }
    }));
  }, [todoId]);

  return handleClockIn;
}

export const useDeleteTodo = (todoId: string) => {
  const dispatch = useAppDispatch();
  const clockIns = useAppSelector(ByTodoIdSelector.bind(null, todoId));

  const deleteTodo = useCallback(() => {
    dispatch(todosActions.removeOne(todoId));
    dispatch(clockInsActions.removeMany(clockIns.map(clockIn => clockIn.id)));
  }, [todoId]);

  return deleteTodo;
}

export const useCurrentClockInNumber = (todoId: string, unitNumber: number, unit: TimesUnit) => {
  const clockIns = useAppSelector(ByTodoIdSelector.bind(null, todoId));

  let currentClockIns: ClockIn[];

  if (unit === 'weekly') {
    const weeksInYear = moment().weeksInYear();
    currentClockIns = clockIns.filter(clockIn => {
      return moment(clockIn.timeStamp).weeksInYear() === weeksInYear;
    });
  } else if (unit === 'daily') {
    const currentDate = moment().date();
    currentClockIns = clockIns.filter(clockIn => {
      return moment(clockIn.timeStamp).date() === currentDate;
    });
  } else {
    currentClockIns = [];
  }

  return currentClockIns;
}

export const useClockIns = (todoId: string) => {
  return useAppSelector(ByTodoIdSelector.bind(null, todoId));
}
