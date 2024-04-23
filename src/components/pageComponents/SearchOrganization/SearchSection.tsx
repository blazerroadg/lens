import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import LensImage from "../../baseComponents/LensImage/LensImage";
import IconInputText from "../../composeComponents/IconInputText/IconInputText";
import Button from "../../baseComponents/Button/Button";

interface SearchSectionProps {
  orgName: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFetchRepos: () => void;
  loading: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  orgName,
  onInputChange,
  onFetchRepos,
  loading,
}) => {
  return (
    <>
      <LensImage src="logoLens.png" alt="Open Source Lense" />
      <IconInputText
        onChange={onInputChange}
        icon={<FaSearch />}
        placeholder="Input Organization name"
        value={orgName}
      />
      <Button onClick={onFetchRepos} loading={loading}>
        Search
      </Button>
    </>
  );
};

export default SearchSection;
