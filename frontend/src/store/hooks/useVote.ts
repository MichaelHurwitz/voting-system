import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { voteForCandidate } from '../features/candidates/candidatesSlice';

export const useVote = () => {
  const dispatch: AppDispatch = useDispatch();

  const vote = (candidateId: string) => {
    dispatch(voteForCandidate(candidateId));
  };

  return { vote };
};
