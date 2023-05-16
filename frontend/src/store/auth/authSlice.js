import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login', 
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));
        return json
      }
      else {
        return rejectWithValue(json.error);
      }

    } catch (error) {
      return rejectWithValue("There was an error...");
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
})

// export const signup = (email, password) => async dispatch => {

// };

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginRequested: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    loginSucceeded: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    },
    loginFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    },
    loggedout: (state) => {
      return {
        ...state,
        user: null
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return { ...state, loading: true};
    })
    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state, loading: false, user: action.payload, error: null };
    })
    builder.addCase(login.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload }
    })
    builder.addCase(logout.fulfilled, (state) => {
      return { ...state, user: null };
    })
  }
});

export const { loginRequested, loginSucceeded, loginFailed, loggedout } = authSlice.actions;

export default authSlice.reducer;