import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate  from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await searchGithub();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };
  fetchData();
  }, []);


  const handleSearch = async () => {
    const data = await searchGithubUser(search);
    if (data) {
      setCandidates([data]);
    } else {
      setCandidates([]);
    }

  };

  return (
    <div>
      <h1>CandidateSearch</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.name}>{candidate.name}</li>
        ))}
      </ul>
    </div>
  );


};

export default CandidateSearch;
