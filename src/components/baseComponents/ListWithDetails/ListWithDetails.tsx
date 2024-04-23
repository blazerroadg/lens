import { useState } from "react";
import {
  RowWrapper,
  Title,
  Count,
  ExpandIcon,
  Details,
  Author,
  CommitLink,
  CommitMessage,
  DetailItem,
  DetailRow,
  RowWrapperDetails,
  RowContainer,
} from "./ListWithDetails.style";
import { Repo } from "../../../models/Repo";
import { Commit } from "../../../models/Commit";

interface ListWithDetailsProps {
  data: Repo[];
  fetchDetails: (index: number, repo: Repo) => Promise<Commit[]>;
}

const ListWithDetails: React.FC<ListWithDetailsProps> = ({
  data,
  fetchDetails,
}) => {
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const [detailsData, setDetailsData] = useState<Commit[]>([]);

  const toggleRowExpansion = async (index: number, repo: Repo) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
    } else {
      const details = await fetchDetails(index, repo);
      setDetailsData(details);
      setExpandedRowIndex(index);
    }
  };

  return (
    <RowContainer>
      {data.map((rowData, index) => (
        <div key={index}>
          {/* Render RowWrapper for each row */}
          <RowWrapper>
            <Title>{rowData.name}</Title>
            <Count>Count: {rowData.forks_count}</Count>
            <ExpandIcon
              data-testid={`expand-icon-${index}`}
              onClick={() => toggleRowExpansion(index, rowData)}
            >
              ▼
            </ExpandIcon>
          </RowWrapper>
          <RowWrapperDetails>
            {/* Render Details inside a new RowWrapper only if expanded */}
            {expandedRowIndex === index &&
              detailsData.map((commit, i) => (
                <Details key={i}>
                  <DetailItem>
                    <DetailRow>
                      <Author>{commit.author}</Author>
                      <CommitMessage>{commit.message}</CommitMessage>
                      <CommitLink href={commit.url} target="_blank">
                        {commit.url}
                      </CommitLink>
                    </DetailRow>
                  </DetailItem>
                </Details>
              ))}
          </RowWrapperDetails>
        </div>
      ))}
    </RowContainer>
  );
};

export default ListWithDetails;
