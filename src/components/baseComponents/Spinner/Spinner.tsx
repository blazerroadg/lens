import React from 'react';
import { SpinnerWrapper, SpinnerInner } from './Spinner.style';

const Spinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <SpinnerInner />
    </SpinnerWrapper>
  );
};

export default Spinner;
