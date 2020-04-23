import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';

interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.SFC<NotFoundProps> = () => {
    return (<>
        <Link to="/" className="link" >
            This is the end. Nobody's here!
        </Link>
    </>);
}

export { NotFound };
