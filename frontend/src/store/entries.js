

const SET_ENTRIES = 'SET_ENTRIES'

// action creators

const setEntries = (entries) => ({
  type: SET_ENTRIES,
  payload: entries
});

// functions

const fetchEntries = (entries) => async dispatch => {
  dispatch(setEntries(entries));
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