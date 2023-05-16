import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [],
  loading: false,
  error: ""
};

export const entriesSlice = createSlice({
  name: "Entries",
  initialState,
  reducers: {

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