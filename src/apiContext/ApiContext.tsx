import { createContext, useContext, useState, FC, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import { Repo } from "../models/Repo";
import { Commit } from "../models/Commit";

interface ApiContextType {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  getReposSortedByForks: (orgName: string, token: string) => Promise<void>;
  fetchCommitsForRepo: (
    orgName: string,
    repoName: string,
    token: string
  ) => Promise<Commit[]>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};

export const ApiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReposSortedByForks = async (
    orgName: string,
    token: string
  ): Promise<void> => {
    const apiUrl = `https://api.github.com/orgs/${orgName}/repos`;

    try {
      setLoading(true);
      const response = await axios.get<Repo[]>(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      const sortedRepos = response.data.sort(
        (a, b) => b.forks_count - a.forks_count
      );
      setRepos(sortedRepos);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setError(
          `Failed to fetch repositories: ${axiosError.response?.status}`
        );
      } else {
        setError(`Unexpected error: ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCommitsForRepo = async (
    orgName: string,
    repoName: string,
    token: string
  ): Promise<Commit[]> => {
    const apiUrl = `https://api.github.com/repos/${orgName}/${repoName}/commits?per_page=30`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      const commits: Commit[] = response.data.map((commit: any) => ({
        author: commit.commit.author.name,
        message: commit.commit.message,
        url: commit.html_url,
      }));

      setError(null);
      return commits;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setError(
          `Failed to fetch commits for repository ${repoName}: ${axiosError.response?.status}`
        );
      } else {
        setError(`Unexpected error: ${error}`);
      }
      return [];
    } finally {
      setLoading(false);
    }
  };
  return (
    <ApiContext.Provider
      value={{
        repos,
        loading,
        error,
        getReposSortedByForks,
        fetchCommitsForRepo,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
