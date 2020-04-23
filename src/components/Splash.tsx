import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Logo } from './Logo';

export interface SplashProps extends RouteComponentProps { }

const Splash: React.SFC<SplashProps> = () => {
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

export { Splash };
