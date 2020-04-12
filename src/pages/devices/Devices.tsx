import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface DevicesProps extends RouteComponentProps { }

const Devices: React.SFC<DevicesProps> = () => {
    return (<>
        Devices
    </>);
}

export { Devices };
