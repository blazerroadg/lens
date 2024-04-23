import React from "react";
import { StyledImage } from "./LensImage.style";

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};

const LensImage = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  return <StyledImage ref={ref} {...props} />;
});

export default LensImage;
