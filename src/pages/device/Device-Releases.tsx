import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { apiGetAllReleases } from '../../apis';
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
            apiGetAllReleases(code)
                .then(data => setReleases(data))
                .catch(() => setReleases(undefined as any));
        }
    }, [code]);

    const hasReleases = code && releases;
    const isStableRelease = type ? (type === EReleaseType.stable) : !!releases?.stable?.length;

    return (<>
        {
            hasReleases && (
                <>
                    {!!releases.stable?.length && (
                        <ReleaseType
                            code={code}
                            version={version}
                            type={EReleaseType.stable}
                            expanded={isStableRelease}
                            data={releases?.stable.map(d => ({ ...d, actualDate: new Date(d.date) }))}
                            releaseLabel={<FormattedMessage
                                id="release.stable"
                                defaultMessage="Stable Releases" />}
                        />
                    )}
                    {!!releases.beta?.length && (
                        <ReleaseType
                            code={code}
                            version={version}
                            type={EReleaseType.beta}
                            expanded={!isStableRelease}
                            data={releases?.beta.map(d => ({ ...d, actualDate: new Date(d.date) }))}
                            releaseLabel={<FormattedMessage
                                id="release.beta"
                                defaultMessage="Beta Releases" />}
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
