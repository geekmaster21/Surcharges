import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { Image, LinkLocale } from '../../components';

interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.SFC<NotFoundProps> = () => {
    return (<>
        <div className="hero big-image">

            <Image
                src="/images/404.svg"
                alt="Not Found"
                className="nf-img"
            />

            <LinkLocale
                to={"/"}
                className="link underline"
            >
                <FormattedMessage
                    id="mainPage.notFound"
                    defaultMessage="This is the end. Take me back Home!" />
            </LinkLocale>
        </div>
    </>);
}

export default NotFound;
