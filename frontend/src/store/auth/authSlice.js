import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: ""
}

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginRequested: (state, action) => {
      state.loading = true;
    },
    loginSucceeded: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.error
    },
    logout: () => {
      state.user = null
    }
  }
});

export const { loginRequested, loginSucceeded, loginFailed, logout } = authSlice.actions;

// const createSlice = require("@reduxjs/toolkit").createSlice;

// const initialState = {
//   user: JSON.parse(localStorage.getItem('user')),
//   loading: false,
//   error: ""
// }

// const authSlice = createSlice({
//   name: "Auth",
//   initialState,
//   reducers: {
//     loginRequested: (state, action) => {
//       state.loading = true;
//     },
//     loginSucceeded: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     },
//     loginFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.error
//     },
//     logout: () => {
//       state.user = null
//     }
//   }
// });

// module.exports = authSlice.reducer
// module.exports.authActions = authSlice.actions