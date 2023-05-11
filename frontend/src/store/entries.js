

const SET_ENTRIES = 'SET_ENTRIES'

// action creators

export const setEntries = (entries) => ({
  type: SET_ENTRIES,
  payload: entries
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
    console.log('fetchentries: ', json)
    dispatch(setEntries(json));
  }
  else return;
};

// reducer

const entriesReducer = (state = {}, action) => {
  const nextState = {...state};

  switch(action.type){
    case SET_ENTRIES:
      return { ...action.payload };
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