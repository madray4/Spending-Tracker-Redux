import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: ""
};

export const login = (email, password) => async dispatch => {

};

export const logout = createAsyncThunk('auth/logout', () => {
    console.log(JSON.parse(localStorage.getItem('user')));
})

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginRequested: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    loginSucceeded: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    },
    loginFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    },
    loggedout: (state) => {
      return {
        ...state,
        user: null
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      return { ...state, user: null };
    })
  }
});

export const { loginRequested, loginSucceeded, loginFailed, loggedout } = authSlice.actions;

export default authSlice.reducer;