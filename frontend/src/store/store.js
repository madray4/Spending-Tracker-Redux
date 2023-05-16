import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// reducers
import authReducer from './auth';
import entriesReducer from './entries';

export const rootReducer = combineReducers({
  entries: entriesReducer,
  user: authReducer
});

const logger = require('redux-logger').default;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

const setupStore = (preloadedState) => {
  // return configureStore({ reducer: rootReducer, preloadedState, enhancers: enhancer});
  return createStore(rootReducer, preloadedState, enhancer);
};

export default setupStore;