import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchCandidates } from '../store/features/candidates/candidatesSlice';
import StatisticsChart from './StatisticsChart';
import '../styles/Statistics.css';

const Statistics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { candidates, status, error } = useSelector((state: RootState) => state.candidates);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  return (
    <div className="statistics-page">
      <h2>Election Statistics</h2>
      {status === 'loading' && <p>Loading statistics...</p>}
      {status === 'failed' && <p className="error">{error}</p>}
      {status === 'succeeded' && <StatisticsChart candidates={candidates} />}
    </div>
  );
};

export default Statistics;
