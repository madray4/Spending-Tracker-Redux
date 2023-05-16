import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import authReducer from "./auth/authSlice";
import entriesReducer from "./entries/entriesSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    entries: entriesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk),
});

// const configureStore = require("@reduxjs/toolkit").configureStore;
// const { getDefaultMiddleware } = require("@reduxjs/toolkit");
// const authReducer = require("../store/auth/authSlice")
// const entriesReducer = require("./entries/entriesSlice")

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     entries: entriesReducer
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().findconcat(loggerMiddleware),
// });

// module.export = store