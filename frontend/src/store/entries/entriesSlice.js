import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [],
  loading: false,
  error: ""
};

export const fetchEntries = createAsyncThunk(
  'entries/fetch',
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
)

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