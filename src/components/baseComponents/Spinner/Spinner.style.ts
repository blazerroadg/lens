import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
`;

export const SpinnerInner = styled.div`
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #ccc;
  border-top-color: #333;
  animation: ${spinAnimation} 1s infinite linear;
`;
