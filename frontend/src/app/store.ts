import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Define RootState to use it for typing useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
