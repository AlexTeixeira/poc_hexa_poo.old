import {configureStore, ThunkAction, Action, ThunkDispatch, AnyAction} from '@reduxjs/toolkit';
import todosReducer from '../features/todo/todosSlice';
import {ThunkServiceProvider} from "../features/config/ThunkServiceProvider";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware:
      (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: ThunkServiceProvider,
            },
            serializableCheck: false,
          }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

