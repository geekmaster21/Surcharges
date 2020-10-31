export interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

const Image: React.FunctionComponent<ImageProps> = ({
  draggable,
  alt,
  src,
  ...rest
}) => {
  return <img alt={alt} src={src} draggable={Boolean(draggable)} {...rest} />;
};

export { Image };
