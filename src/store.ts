import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import clockInsSlice, { clockInsActions } from "./features/clockInsSlice";
import todosSlice, { todosActions } from "./features/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    clockIns: clockInsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


store.subscribe(() => {
  console.log(store.getState());
  window.localStorage.setItem('store', JSON.stringify(store.getState()));
});
const initialStore = JSON.parse(window.localStorage.getItem('store') || '{}');
store.dispatch(todosActions.setAll(initialStore?.todos?.entities || {}));
store.dispatch(clockInsActions.setAll(initialStore?.clockIns?.entities || {}));
