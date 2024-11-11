import React from 'react';
import { Candidate } from '../types/candidate';
import '../styles/CandidateCard.css';

interface CandidateCardProps {
  candidate: Candidate;
  vote: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, vote }) => (
  <div className="candidate-card">
    <img src={candidate.image} alt={`${candidate.name}`} className="candidate-image" />
    <div className="candidate-details">
      <h3 className="candidate-name">{candidate.name}</h3>
      <p className="candidate-votes">Votes: {candidate.votes}</p>
      <button onClick={vote} className="vote-button">Vote</button>
    </div>
  </div>
);

export default CandidateCard;
