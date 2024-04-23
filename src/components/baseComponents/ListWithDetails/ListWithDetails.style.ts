import styled, { keyframes } from "styled-components";

export const expandAnimation = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 300px; 
    opacity: 1;
  }
`;

export const RowContainer = styled.div`
  width: 80%;
`;
export const RowWrapper = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  width: 80%;
  display: flex;
  align-items: center;
`;

export const RowWrapperDetails = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  width: 80%;
`;

export const Title = styled.div`
  font-weight: bold;
  flex: 1;
  text-align: left;
`;

export const Count = styled.div`
  margin-left: auto;
`;

export const ExpandIcon = styled.span`
  cursor: pointer;
  display: inline-block;
  margin-left: 10px;
`;
export const Details = styled.div`
  animation: ${expandAnimation} 0.3s ease forwards;
  overflow: hidden;
  margin-top: 10px; /* Add margin to separate from the header row */
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Author = styled.span`
  flex: 1;
  width: 40%;
  text-align: left;
`;

export const CommitMessage = styled.span`
  flex: 2;
  text-align: left;
  width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const CommitLink = styled.a`
  flex: 1;
  text-align: right;
  width: 30%;
`;
