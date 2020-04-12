import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface WikiProps extends RouteComponentProps { }

const Wiki: React.SFC<WikiProps> = () => {
    return <iframe className="wiki" title="Wiki" src="https://wiki.orangefox.tech"></iframe>;
}

export { Wiki };
