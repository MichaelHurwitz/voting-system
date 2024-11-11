import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from '../../../types/status';

interface StatisticsState {
  totalVotes: number;
  topCandidate: string;
  status: Status;
  error: string | null;
}

const initialState: StatisticsState = {
  totalVotes: 0,
  topCandidate: '',
  status: 'idle',
  error: null,
};

// thunk אסינכרוני לקבלת סטטיסטיקות
export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/statistics');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'אירעה שגיאה בלתי צפויה');
    }
  }
);

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    resetStatistics: (state) => {
      // פעולה סינכרונית אופציונלית לאיפוס הסטטיסטיקות
      state.totalVotes = 0;
      state.topCandidate = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action: PayloadAction<{ totalVotes: number; topCandidate: string }>) => {
        state.status = 'succeeded';
        state.totalVotes = action.payload.totalVotes;
        state.topCandidate = action.payload.topCandidate;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error loading statistics';
      });
  },
});

export const { resetStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;
