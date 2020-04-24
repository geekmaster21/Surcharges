import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { getAllReleases } from '../../apis';
import { Card, CardContent } from '../../components';
import { IAllReleases, EReleaseType } from '../../models';
import { ReleaseType } from './Release-Type';

interface DeviceReleasesProps extends RouteComponentProps {
    code: string;
}

const DeviceReleases: React.SFC<DeviceReleasesProps> = ({ code }) => {
    const [releases, setReleases] = useState<IAllReleases>({} as IAllReleases);

    useEffect(() => {
        if (code) {
            getAllReleases(code)
                .then(data => setReleases(data))
                .catch(() => setReleases(undefined as any));
        }
    }, [code]);

    const hasReleases = code && releases;
    const hasStableRelease = !!releases?.stable?.length;

    return (<>
        {
            hasReleases && (
                <>
                    {!!releases.stable?.length && (
                        <ReleaseType
                            code={code}
                            data={releases?.stable}
                            type={EReleaseType.stable}
                            expanded={hasStableRelease}
                        />
                    )}
                    {!!releases.beta?.length && (
                        <ReleaseType
                            code={code}
                            data={releases?.beta}
                            type={EReleaseType.beta}
                            expanded={!hasStableRelease}
                        />
                    )}
                </>
            )
        }

        {
            !hasReleases && (
                <Card elevation={3} style={{ marginTop: '10px' }} >
                    <CardContent style={{
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        There are no releases for this device yet.
                    </CardContent>
                </Card>
            )
        }
    </>);
}

export { DeviceReleases };
