

const SET_ENTRIES = 'SET_ENTRIES';
const ADD_ENTRY = 'ADD_ENTRY';

// action creators

const setEntries = (entries) => ({
  type: SET_ENTRIES,
  payload: entries
});

const addEntry = (entry) => ({
  type: ADD_ENTRY,
  payload: entry
});



// functions

export const fetchEntries = (token) => async dispatch => {
  const response = await fetch('/api/entries', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if  (response.ok) {
    const json = await response.json();
    dispatch(setEntries(json));
  }
  else return;
};

export const createEntry = (entry, token) => async dispatch => {
  const response = await fetch('/api/entries',{
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
  });
  const json = await response.json();
  if (response.ok) {
    dispatch(addEntry(json));
  }
  return json;
}

// reducer

const entriesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = {...state};

  // const nextState = {...state};

  switch(action.type){
    case SET_ENTRIES:
      return { ...action.payload };
    case ADD_ENTRY:
      // console.log("old:", state);
      newState[Object.keys(state).length] = action.payload;
      // console.log("new:", state);
      return { ...newState };
    // case 'DELETE_ENTRY':
    //   console.log('DELETE_ENTRY context')
    //   return{
    //     entries: state.entries.filter((entry) => entry._id !== action.payload._id)
    //   }
    default:
      return state;
  };
};

export default entriesReducer;