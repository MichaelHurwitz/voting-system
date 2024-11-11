// src/store/features/candidates/candidatesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CandidatesState, Candidate } from '../../../types/candidate';

const initialState: CandidatesState = {
  candidates: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch candidates
export const fetchCandidates = createAsyncThunk<
  Candidate[], 
  void,        
  {}           
>(
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

// Async thunk to vote for a candidate
export const voteForCandidate = createAsyncThunk<
  { candidateId: string; votes: number }, // Return type
  string,                                // Argument type (candidateId)
  {}                                     // Optional thunkAPI config type
>(
  'candidates/voteForCandidate',
  async (candidateId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/vote`,
        { candidateId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        const candidate = state.candidates.find((c) => c._id === candidateId);
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
          console.error("Failed to fetch candidates:", action.error.message); 
        })
        .addCase(voteForCandidate.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(voteForCandidate.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const { candidateId, votes } = action.payload;
          const candidate = state.candidates.find((c) => c._id === candidateId);
          if (candidate) {
            candidate.votes = votes;
          }
        })
        .addCase(voteForCandidate.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || "Failed to vote for candidate";
          console.error("Failed to vote for candidate:", action.error.message); 
        });
    },
  });
  
  export const { updateCandidates } = candidatesSlice.actions;
  export default candidatesSlice.reducer;
  