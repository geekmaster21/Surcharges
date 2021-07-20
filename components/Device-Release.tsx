import { Card, CardContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { groupBy } from 'core';
import { IDevice, IRelease } from 'models';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release-type';
import { OpenOutside } from './Open-Outside';
import { ReleaseType } from './Release-Type';

type Props = {
  device: IDevice;
  releases: IRelease[];
};

const DeviceReleases = ({ device, releases }: Props) => {
  const classes = useStyles();
  const grouped = groupBy(releases, d => d.type || 'Others');

  function withActualDateInRelease(rel: IRelease[]) {
    return rel ? rel.map(d => ({ ...d, actualDate: new Date(d.date) })) : rel;
  }

  console.log(releases);

  const hasStableReleases = Boolean(grouped.stable?.length);

  return (
    <>
      {!device.supported && (
        <Alert severity='warning' variant='outlined' className={classes.alert}>
          <FormattedMessage
            id='device.unsupported.primaryText'
            defaultMessage={`This device is unsupported, so bug fixes or updates will not be released in the future. Kindly refrain from seeking help in the telegram channels as they won't be entertained. Use at your own risk!`}
          />
          <br />
          <FormattedMessage
            id='device.unsupported.secondaryText'
            defaultMessage='Support for this device may be added in the future, only if someone could actively maintain it. Read the {wiki} about it.'
            values={{
              wiki: (
                <OpenOutside
                  className='link orange'
                  href='https://wiki.orangefox.tech/en/guides/base'
                >
                  Wiki
                </OpenOutside>
              ),
            }}
          />
        </Alert>
      )}
      <Fragment key={device._id}>
        {releases && (
          <>
            {hasStableReleases && (
              <ReleaseType
                expanded
                type='stable'
                code={device._id}
                data={withActualDateInRelease(grouped.stable)}
                releaseLabel={
                  <FormattedMessage
                    id='release.type.stable'
                    defaultMessage='Stable Releases'
                  />
                }
              />
            )}
            {grouped.beta?.length && (
              <ReleaseType
                type='beta'
                code={device._id}
                expanded={!hasStableReleases}
                data={withActualDateInRelease(grouped.beta)}
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
    </>
  );
};

export { DeviceReleases };
