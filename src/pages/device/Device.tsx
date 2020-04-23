import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { DeviceInfo } from './Device-Info';
import { DeviceReleases } from './Device-Releases';

interface DeviceProps extends RouteComponentProps {
    code?: string;
}

const Device: React.SFC<DeviceProps> = ({ code }) => {

    return (<>
        <DeviceInfo code={code} />
        <DeviceReleases code={code || ''} />
    </>);
}

export { Device };
