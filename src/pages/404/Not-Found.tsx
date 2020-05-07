import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { LinkLocale } from '../../components';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as NFSvg } from '../../arts/404.svg'

interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.SFC<NotFoundProps> = () => {
    return (<>
        <div className="hero big-image">
            <NFSvg className="nf-img" />
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
