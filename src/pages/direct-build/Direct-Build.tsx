import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card, CardContent, DeviceInfo, Release } from '../../components';
import { EReleaseType } from '../../models';

interface DirectBuildProps extends RouteComponentProps {
    code?: string;
    version?: string;
    type?: EReleaseType;
}

const DirectBuild: React.SFC<DirectBuildProps> = ({ code, version, type }) => {
    return (<Card>
        <CardContent>
            <DeviceInfo code={code} />
            <Release
                code={code}
                showAllBuild
                defaultExpanded
                version={version || 'last'}
                type={type || EReleaseType.stable}
            />
        </CardContent>
    </Card>);
}

export default DirectBuild;
