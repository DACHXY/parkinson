import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  username: 'danny',
  sessionToken: '',
  isLogin: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setSessionToken(state, action) {
      state.sessionToken = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    signOut(state) {
      state.username = '';
      state.sessionToken = '';
      state.isLogin = false;
    },
  },
});

export const {
  setUsername, setSessionToken, setIsLogin, signOut, setUserId,
} = authSlice.actions;

export default authSlice.reducer;
