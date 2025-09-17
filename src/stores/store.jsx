import { configureStore } from '@reduxjs/toolkit';

import uploadReducer from './uploadSlice';
import authSlice from './authSlice';
import videoSlice from './videoSlice';

const store = configureStore({
  reducer: {
    fileUploaded: uploadReducer,
    auth: authSlice,
    videoInfo: videoSlice,
  },
});

export default store;
