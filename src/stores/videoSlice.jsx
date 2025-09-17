import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoList: [],
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoList(state, action) {
      state.videoList = action.payload;
    },
  },
});

export const {
  setVideoList,
} = videoSlice.actions;

export default videoSlice.reducer;
