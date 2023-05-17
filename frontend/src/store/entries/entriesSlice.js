import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [],
  loading: false,
  error: "",
  emptyFields: []
};

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async({ token }, { rejectWithValue }) => {
    const response = await fetch('/api/entries', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    if(response.ok){
      return json;
    }
    else{
      return rejectWithValue(json.error);
    }
  }
);

// create entries
export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async ({ token, entry }, { rejectWithValue }) => {
    const response = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await response.json();
    if(response.ok){
      return json;
    }
    else{
      return rejectWithValue(json);
    }
  }
);
export const entriesSlice = createSlice({
  name: "Entries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all entries cases  
    builder.addCase(fetchEntries.pending, (state) => {
      return { ...state, loading: true };
    })
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      return { ...state, loading: false, error: null, entries: action.payload };
    })
    builder.addCase(fetchEntries.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    })
    // create entry cases
    builder.addCase(createEntry.pending, (state) => {
      return { ...state, loading: true };
    })
    builder.addCase(createEntry.fulfilled, (state, action) => {
      return { ...state, 
          loading: false, 
          error: null, 
          entries: [ ...state.entries, action.payload ],
          emptyFields: []};
    })
    builder.addCase(createEntry.rejected, (state, action) => {
      return { ...state,
            loading: false, 
            error: action.payload.error,
            emptyFields: action.payload.emptyFields};
    })
  }
});

export const {  } = entriesSlice.actions;

export default entriesSlice.reducer;

// const createSlice = require("@reduxjs/toolkit").createSlice;

// const initialState = {
//   entries: [],
//   loading: false,
//   error: ""
// }

// const entriesSlice = createSlice({
//   name: "Entries",
//   initialState,
//   reducers: {

//   }
// });

// module.exports = entriesSlice.reducer
// module.exports.entriesActions = entriesSlice.actions