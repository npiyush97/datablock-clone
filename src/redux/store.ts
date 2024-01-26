import { configureStore } from '@reduxjs/toolkit';
import blockModalSlice from './slices/blockmodal';
import workflowSlice from './slices/workflow';

export const store = configureStore({
  reducer: {
    blockModal: blockModalSlice,
    workflow: workflowSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
