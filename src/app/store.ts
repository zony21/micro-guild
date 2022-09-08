import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import { save, load } from 'redux-localstorage-simple';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: (() => {
    if (typeof localStorage === 'undefined') return
    return load() as any
  })(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store