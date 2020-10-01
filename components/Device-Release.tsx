import { Card, CardContent } from '@material-ui/core';
import { EReleaseType, IAllReleases, IRelease } from 'models';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { ReleaseType } from './Release-Type';

type Props = {
  code: string;
  releases: IAllReleases;
};

const DeviceReleases = ({ code, releases }: Props) => {
  const isStableRelease = !!releases?.stable?.length;

  function withActualDateInRelease(rel: IRelease[]) {
    return rel ? rel.map(d => ({ ...d, actualDate: new Date(d.date) })) : rel;
  }

  return (
    <Fragment key={code}>
      {releases && (
        <>
          {!!releases.stable?.length && (
            <ReleaseType
              code={code}
              type={EReleaseType.stable}
              expanded={isStableRelease}
              data={withActualDateInRelease(releases?.stable)}
              releaseLabel={
                <FormattedMessage
                  id='release.type.stable'
                  defaultMessage='Stable Releases'
                />
              }
            />
          )}
          {!!releases.beta?.length && (
            <ReleaseType
              code={code}
              type={EReleaseType.beta}
              expanded={!isStableRelease}
              data={withActualDateInRelease(releases?.beta)}
              releaseLabel={
                <FormattedMessage
                  id='release.type.beta'
                  defaultMessage='Beta Releases'
                />
              }
            />
          )}
        </>
      )}

      {!releases && (
        <Card elevation={3} style={{ marginTop: '10px' }}>
          <CardContent
            style={{
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <FormattedMessage
              id='release.notFound'
              defaultMessage='There are no releases for this device yet!'
            />
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};

export { DeviceReleases };
