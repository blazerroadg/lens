import styled, {keyframes} from "styled-components";

export const accordionAnimation = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 300px; 
    opacity: 1;
  }
`;

export const AccordionContainer = styled.div`
  margin-top: 20px;
  width: 80%;
`;

export const AccordionItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  color: #494949;
  text-align: left;
  margin-bottom: 10px;
  overflow: hidden;
`;

export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

export const Title = styled.div`
  font-weight: bold;
  flex: 1;
`;

export const Count = styled.div`
  margin-left: auto;
`;

export const ExpandIcon = styled.span`
  margin-left: auto;
`;

export const AccordionContent = styled.div<{ expanded: boolean }>`
  padding: 10px;
  display: ${({expanded}) => (expanded ? "block" : "none")};
  animation: ${({expanded}) => (expanded ? accordionAnimation : "none")} 0.3s
    ease forwards;
`;

export const CommitDetailContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-top: 10px;
`;

export const CommitDetail = styled.div`
  padding: 5px;
`;

export const Author = styled.span`
  font-weight: bold;
`;

export const CommitMessage = styled.div`
  margin-top: 4px;
`;

export const CommitLink = styled.a`
  display: block;
  margin-top: 4px;
`;
