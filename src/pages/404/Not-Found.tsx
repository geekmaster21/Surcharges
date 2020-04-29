import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { LinkLocale } from '../../components';

interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.SFC<NotFoundProps> = () => {
    return (<>
        <div className="hero big-image">
            <img src="/images/404.svg" alt="404" className="nf-img"/>
            <LinkLocale to={"/"} className="link underline" >
            This is the end. Take me back Home!
        </LinkLocale>
        </div>
    </>);
}

export default NotFound;
