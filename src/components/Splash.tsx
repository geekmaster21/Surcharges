import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { Logo } from './Logo';

export interface SplashProps extends RouteComponentProps { }

const Splash: React.SFC<SplashProps> = () => {
    return (
        <div>
            <div className="hero big-image">
                <img
                    src="/images/select_device.svg"
                    alt="Select Device from List"
                    className="select-dev-img"
                />

                <span className="select-dev">{
                    <FormattedMessage
                        id="mainPage.hintText"
                        defaultMessage="Select device from the list or use search" />
                }</span>
            </div>
            <div className="bottom-logo">
                <Logo />
                <div className="title-container">
                    <h1 className="title">OrangeFox</h1>
                    <h2 className="sub-title">Recovery</h2>
                </div>
            </div>
        </div>
    );
}

export { Splash };
