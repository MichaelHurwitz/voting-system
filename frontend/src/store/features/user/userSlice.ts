import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState } from '../../../types/user';

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
  isAdmin: localStorage.getItem('isAdmin') === 'true',
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/api/login', { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      console.log("API Response - data:", data); // לוג לבדיקת התגובה מהשרת
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', JSON.stringify(data.user.isAdmin)); // שים לב שאנחנו משתמשים ב-data.user.isAdmin
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    },
    setUserFromLocalStorage(state) {
      state.token = localStorage.getItem('token') || null;
      state.isAdmin = localStorage.getItem('isAdmin') === 'true';
      console.log("setUserFromLocalStorage - token:", state.token);
      console.log("setUserFromLocalStorage - isAdmin:", state.isAdmin);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAdmin = action.payload.user.isAdmin; // שמירת isAdmin בצורה ישירה
        console.log("loginUser.fulfilled - user:", state.user);
        console.log("loginUser.fulfilled - token:", state.token);
        console.log("loginUser.fulfilled - isAdmin:", state.isAdmin);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout, setUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;
