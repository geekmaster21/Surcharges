import Link, { LinkProps } from 'next/link';
import { LocalizedPaths } from 'utils';

type LinkLocaleProps = Partial<LinkProps> & {
  activeClassName?: string;
  children?: React.ReactNode;
  ATagProps?: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
};

const LinkLocale = ({
  as,
  href,
  children,
  ATagProps,
  ...props
}: LinkLocaleProps) => {
  const [_as, _href] = LocalizedPaths(as, href);
  return (
    <Link href={_href} as={_as} {...props}>
      <a {...ATagProps}>{children}</a>
    </Link>
  );
};

export { LinkLocale };
