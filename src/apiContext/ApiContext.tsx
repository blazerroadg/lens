import {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useMemo,
} from "react";
import axios, { AxiosError } from "axios";
import { Repo } from "../../models/Repo";
import { Commit } from "../../models/Commit";
import { config } from "../config";

interface ApiContextType {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  getReposSortedByForks: (orgName: string) => Promise<void>;
  fetchCommitsForRepo: (orgName: string, repoName: string) => Promise<Commit[]>;
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
  const { functionBaseUrl } = config;

  const getReposSortedByForks = async (orgName: string): Promise<void> => {
    const functionUrl = `${functionBaseUrl}/getReposSortedByForks`;

    try {
      setLoading(true);
      const response = await axios.get(
        `${functionUrl}?orgName=${encodeURIComponent(orgName)}`
      );
      setRepos(response.data);

      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Failed to fetch repositories: ${error.response?.status}`);
        setRepos([]);
      } else {
        setError(`Unexpected error: ${error}`);
        setRepos([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCommitsForRepo = async (
    orgName: string,
    repoName: string
  ): Promise<Commit[]> => {
    const functionUrl = `${functionBaseUrl}/fetchCommitsForRepo`;

    try {
      setLoading(true);
      const response = await axios.get(functionUrl, {
        params: {
          orgName: orgName,
          repoName: repoName,
        },
      });

      const commits: Commit[] = response.data.map((commit: any) => ({
        author: commit.author,
        message: commit.message,
        url: commit.url,
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

  const value = useMemo(
    () => ({
      repos,
      loading,
      error,
      getReposSortedByForks,
      fetchCommitsForRepo,
    }),
    [repos, loading, error, getReposSortedByForks, fetchCommitsForRepo]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
