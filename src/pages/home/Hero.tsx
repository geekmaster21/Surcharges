import React from 'react';
import { Logo } from '../../components/Logo';

export interface HeroProps { }

const Hero: React.SFC<HeroProps> = () => {
    return (
        <div className="hero">
            <Logo />
            <div className="title-container">
                <h1 className="title">OrangeFox</h1>
                <h2 className="sub-title">Recovery</h2>
            </div>
        </div>
    );
}

export { Hero };
