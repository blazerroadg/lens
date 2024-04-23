import React from "react";
import { StyledInput } from "./InputText.style";

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  (props, ref) => {
    return <StyledInput ref={ref} {...props} />;
  }
);

export default InputText;
