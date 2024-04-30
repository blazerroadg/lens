import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Repo } from "../../../../models/Repo";
import { Commit } from "../../../../models/Commit";
import {
  AccordionContainer,
  AccordionItem,
  AccordionHeader,
  Title,
  Count,
  ExpandIcon,
  AccordionContent,
  CommitDetailContainer,
  CommitDetail,
  Author,
  CommitMessage,
  CommitLink,
} from "./ListWithDetails.style";

interface Props {
  data: Repo[];
  fetchDetails: (index: number, repo: Repo) => Promise<Commit[]>;
}

const Accordion: React.FC<Props> = ({ data, fetchDetails }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [detailsData, setDetailsData] = useState<Commit[]>([]);

  const toggleAccordion = async (index: number, repo: Repo) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      const details = await fetchDetails(index, repo);
      setDetailsData(details);
      setExpandedIndex(index);
    }
  };

  return (
    <AccordionContainer>
      {data.map((rowData, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => toggleAccordion(index, rowData)}>
            <Title>{rowData.name}</Title>
            <Count>Count: {rowData.forks_count}</Count>
            <ExpandIcon data-testid={`expand-icon-${index}`}>
              {expandedIndex === index ? "▲" : "▼"}
            </ExpandIcon>
          </AccordionHeader>
          <AccordionContent expanded={expandedIndex === index}>
            {expandedIndex === index && (
              <CommitDetailContainer>
                {detailsData.map((commit, i) => (
                  <CommitDetail key={uuidv4()}>
                    <Author>{commit.author}</Author>
                    <CommitMessage>{commit.message}</CommitMessage>
                    <CommitLink
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {commit.url}
                    </CommitLink>
                  </CommitDetail>
                ))}
              </CommitDetailContainer>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default Accordion;
