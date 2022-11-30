import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filePath: '',
  filePreviewURL: '',
  showPreview: false,
};

const uploadSlice = createSlice({
  name: 'fileUploaded',
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
