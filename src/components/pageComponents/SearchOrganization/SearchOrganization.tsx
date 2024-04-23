import { ChangeEvent, useState } from "react";
import SearchSection from "./SearchSection";
import ListWithDetails from "../../baseComponents/ListWithDetails/ListWithDetails";
import { Repo } from "../../../models/Repo";
import { Commit } from "../../../models/Commit";
import { useApi } from "../../../apiContext/ApiContext";
import { config } from "../../../config";

const SearchOrganization = () => {
  const { githubToken } = config;
  const [orgName, setOrgName] = useState("");
  const { repos, loading, error, getReposSortedByForks, fetchCommitsForRepo } =
    useApi();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrgName(event.target.value);
  };
  const handleFetchRepos = () => {
    if (orgName.length === 0) {
      return;
    }
    getReposSortedByForks(orgName, githubToken);
  };

  const fetchCommitDetails = async (
    index: number,
    repo: Repo
  ): Promise<Commit[]> => {
    const { name } = repo;
    try {
      const commits = await fetchCommitsForRepo(orgName, name, githubToken);
      return commits;
    } catch (error) {
      console.error("Error fetching commits:", error);
      return [];
    }
  };

  return (
    <>
      <SearchSection
        orgName={orgName}
        onInputChange={handleInputChange}
        onFetchRepos={handleFetchRepos}
        loading={loading}
      />
      {repos && (
        <ListWithDetails data={repos} fetchDetails={fetchCommitDetails} />
      )}
    </>
  );
};

export default SearchOrganization;
