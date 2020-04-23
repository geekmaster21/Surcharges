import { Link } from "@reach/router";
import React from 'react';
import { Logo } from './Logo';

export interface HeaderProps {
    showLogo?: boolean;
}

const Header: React.SFC<HeaderProps> = ({ showLogo }) => {
    return (
        <header>
            <span>
                {
                    showLogo && (
                        <Link to="/" className="logo-container link">
                            <Logo />
                            OrangeFox Recovery
                        </Link>)
                }
            </span>
            <ul className="routes">
                <li>
                    {/* <WikiLink label="/wiki" className="link" /> */}
                </li>
            </ul>
        </header>
    );
}

export { Header };
