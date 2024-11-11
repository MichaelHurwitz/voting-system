import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { useVote } from '../store/hooks/useVote';
import { useVoteUpdates } from '../store/hooks/useVoteUpdates';
import { fetchCandidates } from '../store/features/candidates/candidatesSlice';
import CandidateCard from './CandidateCard';
import '../styles/CandidatesList.css';

const CandidatesList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vote } = useVote();
  useVoteUpdates();
  const candidates = useSelector((state: RootState) => state.candidates.candidates);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  return (
    <div className="candidate-list-container">
      <h2 className="page-title">Candidates</h2>
      <div className="candidates-grid">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            vote={() => vote(candidate._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;
