import React, { useEffect, useState } from 'react';
import { getAllReleases } from '../../apis';
import { Card, CardContent } from '../../components';
import { EReleaseType, IAllReleases } from '../../models';
import { ReleaseType } from './Release-Type';

interface DeviceReleasesProps {
    code: string;
    version?: string;
    type?: EReleaseType;
}

const DeviceReleases: React.SFC<DeviceReleasesProps> = ({ code, type, version }) => {
    const [releases, setReleases] = useState<IAllReleases>({} as IAllReleases);

    useEffect(() => {
        if (code) {
            getAllReleases(code)
                .then(data => setReleases(data))
                .catch(() => setReleases(undefined as any));
        }
    }, [code]);

    const hasReleases = code && releases;
    const hasStableRelease = type ? (type === EReleaseType.stable) : !!releases?.stable?.length;

    return (<>
        {
            hasReleases && (
                <>
                    {!!releases.stable?.length && (
                        <ReleaseType
                            code={code}
                            version={version}
                            type={EReleaseType.stable}
                            expanded={hasStableRelease}
                            data={releases?.stable.map(d => ({ ...d, actualDate: new Date(d.date) }))}
                        />
                    )}
                    {!!releases.beta?.length && (
                        <ReleaseType
                            code={code}
                            version={version}
                            type={EReleaseType.beta}
                            expanded={!hasStableRelease}
                            data={releases?.beta.map(d => ({ ...d, actualDate: new Date(d.date) }))}
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
