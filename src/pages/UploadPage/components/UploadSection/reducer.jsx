import React, { useReducer } from 'react';

const date = new Date();
const dateString = `${date.toISOString().substring(0, 10)} ${date.toISOString().substring(11, 16)}`;

export const initialState = {
  detect: '',
  name: '',
  gender: '',
  date: dateString,
  location: '',
};

export const ACTION = {
  setDetect: 'setDetect',
  setName: 'setName',
  setGender: 'setGender',
  setDate: 'setDate',
  setLocation: 'setLocation',
  setReducer: 'setReducer',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.setDetect:
      return {
        ...state,
        detect: action.payload,
      };
    case ACTION.setName:
      return {
        ...state,
        name: action.payload,
      };
    case ACTION.setDate:
      return {
        ...state,
        date: action.payload,
      };
    case ACTION.setGender:
      return {
        ...state,
        date: action.payload,
      };
    case ACTION.setLocation:
      return {
        ...state,
        location: action.payload,
      };
    case ACTION.setAccessToken:
      return {
        ...state,
        access_token: action.payload,
      };
    case ACTION.setReducer:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
