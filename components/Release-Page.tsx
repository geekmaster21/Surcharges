import { Card, CardContent } from '@material-ui/core';
import { DeviceInfo, MetaTagsDynamic } from 'components';
import Release from 'components/Release';
import { titleCase } from 'core';
import { IDevice, IRelease } from 'models';

type Props = {
  popup: string;
  info: IDevice;
  release: IRelease;
};

const ReleasePage = ({ info, popup, release }: Props) => {
  const url = `https://orangefox.download/release/${info._id}/${release.type}/${release.version}`;
  const canonical = `https://orangefox.download/release/${release._id}`;
  const title = `${titleCase(release.type)} release v${release.version} for ${
    info.title
  } (${info.codenames.join(', ')})`;
  return (
    <>
      <MetaTagsDynamic
        url={url}
        title={title}
        canonical={canonical}
        desc={`Orangefox recovery for ${info.title} (${info.codenames.join(
          ', '
        )})`}
        jsonLd={{
          '@type': 'SoftwareApplication',
          url,
          name: title,
          downloadUrl: url,
          description: title,
          accessMode: 'visual',
          identifier: release.version,
          operatingSystem: 'Android',
          applicationCategory: 'SoftwareApplication',
          applicationSubCategory: 'CustomRecovery',
          maintainer: info.maintainer?.name || 'None',
          offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'XXX',
            availability: `https://schema.org/${
              info.supported ? 'InStock' : 'Discontinued'
            }`,
          },
        }}
      />
      <Card>
        <CardContent>
          <DeviceInfo {...info} />
          <Release
            data={release}
            popup={popup}
            showAllReleases
            defaultExpanded
            code={info.codename}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ReleasePage;
