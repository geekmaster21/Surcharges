import Link, { LinkProps } from 'next/link';

type AnchorLinkProps = Partial<LinkProps> & {
  activeClassName?: string;
  children?: React.ReactNode;
  ATagProps?: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
};

const AnchorLink = ({
  as,
  href,
  children,
  ATagProps,
  ...props
}: AnchorLinkProps) => {
  return (
    <Link href={href || '/'} as={as || '/'} {...props}>
      <a {...ATagProps}>{children}</a>
    </Link>
  );
};

export { AnchorLink };
