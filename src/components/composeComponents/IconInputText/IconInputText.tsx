import React from "react";
import InputText, {
  InputTextProps,
} from "../../baseComponents/InputText/InputText";
import { IconContainer, StyledInputContainer } from "./StyledIconInputText";

type IconInputTextProps = InputTextProps & {
  icon: React.ReactNode;
};

const IconInputText = React.forwardRef<HTMLInputElement, IconInputTextProps>(
  ({ icon, ...props }, ref) => {
    return (
      <StyledInputContainer>
        <IconContainer>{icon}</IconContainer>
        <InputText ref={ref} {...props} />
      </StyledInputContainer>
    );
  }
);

export default IconInputText;
