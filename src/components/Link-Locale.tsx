import React from 'react';
import { Link, LinkProps } from '@reach/router';
import { GetSelectedLocale } from '../utils';

export interface LinkLocaleProps<T = any> extends LinkProps<T> {
    to: string
}

const LinkLocale: React.SFC<LinkLocaleProps> = ({ to, ...props }) => {
    const locale = GetSelectedLocale();
    return (
        <Link
            to={`/${locale}${to}`}
            {...props as any}
        />
    )
}

export { LinkLocale };
