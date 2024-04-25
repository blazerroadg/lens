import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 10px;
  margin: 5px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 8px;
  width: 30%;

  &:focus {
    border: none;
    box-shadow: none;
  }

  &::placeholder {
    color: #ccc;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;
