import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filePath: '',
};

const uploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setUploadedFile(state, action) {
      state.filePath = action.payload;
    },
    removeUploadedFile(state) {
      state.filePath = '';
    },
    setUploadedFileURL(state, action) {
      state.filePreviewURL = action.payload;
    },
    setShowPreview(state, action) {
      state.showPreview = action.payload;
    },
  },
});

export const {
  setUploadedFile, removeUploadedFile, setUploadedFileURL, setShowPreview,
} = uploadSlice.actions;

export default uploadSlice.reducer;
