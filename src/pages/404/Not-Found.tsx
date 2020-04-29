import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { LinkLocale } from '../../components';
import { FormattedMessage } from 'react-intl';

interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.SFC<NotFoundProps> = () => {
    return (<>
        <div className="hero big-image">
            <img src="/images/404.svg" alt="404" className="nf-img"/>
            <LinkLocale to={"/"} className="link underline">{
                <FormattedMessage
                    id="mainPage.notFound"
                    defaultMessage="This is the end. eTake me back Home!" />
            }</LinkLocale>
        </div>
    </>);
}

export default NotFound;
