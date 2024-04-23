import React from "react";
import { StyledButton } from "./Button.style";
import Spinner from "../Spinner/Spinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, ...rest }, ref) => {
    return (
      <StyledButton ref={ref} disabled={loading} {...rest}>
        {loading ? <Spinner /> : children}
      </StyledButton>
    );
  }
);

export default Button;
