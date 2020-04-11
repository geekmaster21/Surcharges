import React from 'react';
import { Logo } from './Logo';
import { Link } from "@reach/router";

export interface HeaderProps { }

const Header: React.SFC<HeaderProps> = () => {
    return (
        <header>
            <div className="logo-container">
                {/* <Logo /> */}
            </div>
            <ul className="routes">
                <li>
                    <Link to="/devices">/devices</Link>{" "}
                </li>
                <li>
                    <Link to="/wiki">/wiki</Link>{" "}
                </li>
            </ul>
        </header>
    );
}

export { Header };
