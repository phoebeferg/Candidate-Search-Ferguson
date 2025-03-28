import React from 'react';
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem("potentialCandidates") || "[]")
  );

  useEffect(() => {
    const loadCandidate = async () => {
      await fetchCandidate();
    };
    loadCandidate();
  }, []);

  useEffect(() => {
    localStorage.setItem("potentialCandidates", JSON.stringify(potentialCandidates));
  }, [potentialCandidates]);

  const fetchCandidate = async () => {
    try {
      const candidates = await searchGithub();
      if (candidates.length > 0) {
        const userDetails = await searchGithubUser(candidates[0].login);
        setCurrentCandidate(userDetails);
      } else {
        setCurrentCandidate(null);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
      setCurrentCandidate(null);
    }
  };

  const handleAcceptCandidate = () => {
    if (currentCandidate) {
      setPotentialCandidates([...potentialCandidates, currentCandidate]);
    }
    fetchCandidate();
  };

  const handleNextCandidate = () => {
    fetchCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} width={100} />
          <h2>{currentCandidate.name || "N/A"}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || "N/A"}</p>
          <p>Email: {currentCandidate.email || "N/A"}</p>
          <p>Company: {currentCandidate.company || "N/A"}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <br />
          <button onClick={handleAcceptCandidate}>+</button>
          <button onClick={handleNextCandidate}>-</button>
        </div>
      ) : (
        <p>Loading candidate...</p>
      )}
    </div>
  );
};

export default CandidateSearch;
