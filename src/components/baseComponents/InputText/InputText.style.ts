import styled from 'styled-components';
export const StyledInput = styled.input`
  padding: 10px;
  margin: 5px;
  background: transparent;    
  border: none;              
  outline: none;    
  width:100%;          

  &:focus {
    border: none;
    box-shadow: none;         
  }

  &::placeholder {
    color: #ccc;              
  }
`;