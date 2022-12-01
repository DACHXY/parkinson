import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  sessionToken: '',
  isLogin: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setSessionToken(state, action) {
      state.sessionToken = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const {
  setUsername, setSessionToken, setIsLogin,
} = authSlice.actions;

export default authSlice.reducer;
