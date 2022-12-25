import { createSlice } from '@reduxjs/toolkit';
import { useCookies } from 'react-cookie';

const initialState = {
  userId: '',
  email: '',
  username: '',
  sessionToken: '',
  refreshToken: '',
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.id;
      state.sessionToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.isLogin = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
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
    setVerified(state, action) {
      state.verified = action.payload;
    },
    signOut(state) {
      state.username = '';
      state.sessionToken = '';
      state.isLogin = false;
      const [cookie, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
      removeCookie('access_token', { path: '/' });
      removeCookie('refresh_token', { path: '/' });
    },
  },
});

export const {
  setUser, setUsername, setSessionToken, setIsLogin, signOut, setUserId, setVerified,
} = authSlice.actions;

export default authSlice.reducer;
