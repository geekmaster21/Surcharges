import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';

interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.SFC<NotFoundProps> = () => {
    return (<>
        <div className="hero notfound">
            <img src="/images/404.svg" alt="404" className="nf-img"/>
            <Link to="/" className="link" >
                This is the end. Nobody's here!
            </Link>
        </div>
    </>);
}

export { NotFound };
