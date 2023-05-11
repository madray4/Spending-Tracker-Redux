import { createStore, combineReducers } from 'redux';

// reducers
import entriesReducer from './entries';

export const rootReducer = combineReducers({
  entries: entriesReducer
});

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState);
};

export default configureStore;