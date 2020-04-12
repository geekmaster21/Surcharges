import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Logo } from './Logo';

export interface SplashProps extends RouteComponentProps { }

const Splash: React.SFC<SplashProps> = () => {
    return (<>
        <div className="hero">
            <Logo />
            <div className="title-container">
                <h1 className="title">OrangeFox</h1>
                <h2 className="sub-title">Recovery</h2>
            </div>
        </div>
        <div className="metrics flexd-center">
            <div className="card flexd-center">
                <span className="name">
                    Devices
                </span>
                <span className="counter">
                    100
                </span>
            </div>
            <div className="card flexd-center">
                <span className="name">
                    Downloads
                </span>
                <span className="counter">
                    999999
                </span>
            </div>
        </div>
    </>);
}

export { Splash };
