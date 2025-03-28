import Candidate from "../interfaces/Candidate.interface";
import React, { useState } from "react";

const SavedCandidates: React.FC = () => {
  const [savedCandidates] = useState<Candidate[]>(
    JSON.parse(localStorage.getItem("potentialCandidates") || "[]")
  );

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div key={candidate.id}>
            <img src={candidate.avatar_url} alt={candidate.name} width={100} />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || "N/A"}</p>
            <p>Email: {candidate.email || "N/A"}</p>
            <p>Company: {candidate.company || "N/A"}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        ))
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
