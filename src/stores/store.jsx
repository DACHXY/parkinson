import { configureStore } from '@reduxjs/toolkit';

import uploadReducer from './uploadSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    fileUploaded: uploadReducer,
    auth: authSlice,
  },
});

export default store;
