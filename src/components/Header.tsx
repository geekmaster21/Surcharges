import React from 'react';
import { Logo } from './Logo';
import { Link } from "@reach/router";

export interface HeaderProps {
    showLogo?: boolean;
    showLinkDevice?: boolean;
}

const Header: React.SFC<HeaderProps> = ({ showLogo, showLinkDevice }) => {
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
                    {showLinkDevice && <Link to="/device">/devices</Link>}{" "}
                </li>
                <li>
                    <Link to="/wiki">/wiki</Link>{" "}
                </li>
            </ul>
        </header>
    );
}

export { Header };
