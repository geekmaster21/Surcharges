import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { LinkLocale } from '../../components';

interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.SFC<NotFoundProps> = () => {
    return (<>
        <LinkLocale to={"/"} className="link underline" >
            This is the end. Take me back Home!
        </LinkLocale>
    </>);
}

export default NotFound;
