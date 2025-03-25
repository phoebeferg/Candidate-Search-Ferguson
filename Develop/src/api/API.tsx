import Candidate from "../interfaces/Candidate.interface";

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }
    return await response.json();
  } catch (err) {
    console.error("An error occurred", err);
    return [];
  }
};

const searchGithubUser = async (login: string): Promise<Candidate> => {
  try {
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }
    return await response.json();
  } catch (err) {
    console.error("An error occurred", err);
    return {} as Candidate;
  }
};

export { searchGithub, searchGithubUser };
