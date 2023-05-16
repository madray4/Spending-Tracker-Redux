import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import entriesReducer from "./entries/entriesSlice"

const logger = require('redux-logger').default;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

export default configureStore({
  reducer: {
    auth: authReducer,
    entries: entriesReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    enhancers: enhancer
  },

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