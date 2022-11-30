import { configureStore } from '@reduxjs/toolkit';

import uploadReducer from './uploadSlice';

const store = configureStore({
  reducer: {
    fileUploaded: uploadReducer,
  },
});

export default store;
