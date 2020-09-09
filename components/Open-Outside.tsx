export interface LinkNewTabProps
  extends React.DetailedHTMLProps<
    React.LinkHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const OpenOutside: React.SFC<LinkNewTabProps> = ({ children, ...rest }) => {
  return (
    <a target='_blank' rel='noopener noreferrer' {...rest}>
      {children}
    </a>
  );
};

export { OpenOutside };
