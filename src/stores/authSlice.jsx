import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  sessionToken: '',
  isLogin: false,
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
    signOut(state) {
      state.username = '';
      state.sessionToken = '';
      state.isLogin = false;
    },
  },
});

export const {
  setUsername, setSessionToken, setIsLogin, signOut,
} = authSlice.actions;

export default authSlice.reducer;
