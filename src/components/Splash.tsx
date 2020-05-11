import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { Image } from './Image';

export interface SplashProps extends RouteComponentProps { }

const Splash: React.SFC<SplashProps> = () => {
    return (
        <div>
            <div className="hero big-image">

                <Image
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
                <Image
                    alt="OF Logo"
                    className="logo"
                    src="/images/logo.svg"
                />

                <div className="title-container">
                    <h1 className="title">OrangeFox</h1>
                    <h2 className="sub-title">Recovery</h2>
                </div>

            </div>
        </div>
    );
}

export { Splash };
