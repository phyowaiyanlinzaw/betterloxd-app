import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/userSlice';

const store = configureStore({
  reducer: userSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
