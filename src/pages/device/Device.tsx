import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { DeviceInfo } from '../../components';
import { EReleaseType } from '../../models';
import { DeviceReleases } from './Device-Releases';

interface DeviceProps extends RouteComponentProps {
    code?: string;
    version?: string;
    type?: EReleaseType;
}

const Device: React.SFC<DeviceProps> = ({ code, type, version }) => {
    return (<>
        <DeviceInfo code={code} />
        <DeviceReleases
            code={code || ''}
            type={type}
            version={version}
        />
    </>);
}

export { Device };
