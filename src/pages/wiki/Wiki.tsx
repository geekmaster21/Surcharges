import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface WikiProps extends RouteComponentProps { }

const Wiki: React.SFC<WikiProps> = () => {
    return <iframe className="wiki" src="https://wiki.orangefox.tech"></iframe>;
}

export { Wiki };
