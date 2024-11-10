import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CandidatesState } from '../../../types/candidate'; 

const initialState: CandidatesState = {
  candidates: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch candidates
export const fetchCandidates = createAsyncThunk(
  'candidates/fetchCandidates',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/candidates');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default candidatesSlice.reducer;
