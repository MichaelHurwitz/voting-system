import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CandidatesState, Candidate } from '../../../types/candidate';

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
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    updateCandidates: (
      state,
      action: PayloadAction<{ candidateId: string; votes: number }>
    ) => {
      const { candidateId, votes } = action.payload;
      const candidate = state.candidates.find((c) => c.id === candidateId);
      if (candidate) {
        candidate.votes = votes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<Candidate[]>) => {
        state.status = 'succeeded';
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "Failed to fetch candidates";
      });
  },
});

export const { updateCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
