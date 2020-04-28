import React from 'react';
import { Link, LinkProps } from '@reach/router';
import { GetCurrentLocale } from '../utils';

export interface LinkLocaleProps<T = any> extends LinkProps<T> {
    to: string
}

const LinkLocale: React.SFC<LinkLocaleProps> = ({ to, ...props }) => {
    const locale = GetCurrentLocale();
    return (
        <Link
            to={`/${locale}${to}`}
            {...props as any}
        />
    )
}

export { LinkLocale };
