

const SET_ENTRIES = 'SET_ENTRIES';
const ADD_ENTRY = 'ADD_ENTRY';

const DELETE_ENTRY = 'DELETE_ENTRY';

// action creators

const set_entries = (entries) => ({
  type: SET_ENTRIES,
  payload: entries
});

const add_entry = (entry) => ({
  type: ADD_ENTRY,
  payload: entry
});

const delete_entry = (entry) => ({
  type: DELETE_ENTRY,
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
    dispatch(set_entries(json));
  }
  else return;
};

export const createEntry = (entry, token) => async dispatch => {
  console.log('During dispatch')
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
    dispatch(add_entry(json));
  }
  return json;
}

export const deleteEntry = (entry, token) => async dispatch => {
  const response = await fetch('/api/entries/' + entry._id,{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const json = await response.json();
  if (response.ok) {
    dispatch(delete_entry(json))
  }
}

// reducer

const entriesReducer = (state = [], action) => {
  Object.freeze(state);
  let newState = [...state];

  switch(action.type){
    case SET_ENTRIES:
      return action.payload;
    case ADD_ENTRY:
      newState.push(action.payload);
      return newState;
    case DELETE_ENTRY:
      newState = newState.filter((entry) => {
        return entry._id !== action.payload._id; 
      });
      return { ...newState };
    default:
      return state;
  };
};

export default entriesReducer;