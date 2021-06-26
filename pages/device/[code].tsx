import { apiDevice, apiRelease } from 'apis';
import { DeviceInfo, DeviceReleases, MetaTagsDynamic } from 'components';
import { IDeviceWithMaintainer, IRelease } from 'models';
import { NextPageContext } from 'next';
import { IsCSR, RedirectTo, SafePromise } from 'utils';
import sentry from 'utils/sentry';

type Props = {
  releases: IRelease[];
  info: IDeviceWithMaintainer;
};

const Page = ({ info, releases }: Props) => {
  const url = `/device/${info.codename}`;
  const title = `${info.full_name} (${info.codename}) build releases`;

  return (
    <>
      <MetaTagsDynamic
        url={url}
        title={title}
        desc={`Orangefox recovery for ${info.full_name} (${info.codename})`}
        jsonLd={{
          '@type': 'SoftwareApplication',
          url,
          name: title,
          downloadUrl: url,
          description: title,
          accessMode: 'visual',
          identifier: info._id,
          operatingSystem: 'Android',
          applicationCategory: 'SoftwareApplication',
          applicationSubCategory: 'CustomRecovery',
          maintainer: info.maintainer.name || 'None',
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
      <DeviceInfo {...info} />
      <DeviceReleases device={info} releases={releases} />
    </>
  );
};

const deviceCache: {
  codename: string;
  releases: IRelease[];
  info: IDeviceWithMaintainer;
}[] = [];

Page.getInitialProps = async ({ query, res }: NextPageContext) => {
  const codename = query.code as string;
  let releases: IRelease[] = undefined as any;
  let info: IDeviceWithMaintainer = undefined as any;

  const found = deviceCache.find(f => f.codename === codename);

  if (IsCSR && found) {
    info = found.info;
  } else {
    info = (await SafePromise(() =>
      apiDevice.get({ codename }).then(r => {
        if (!r.isSuccess) {
          sentry.error({ __source__: 'pages/device/[code]', codename, found });
          RedirectTo({ res, asPath: '/404' } as NextPageContext);
        }
        return r.data;
      })
    ))!;
  }

  if (!info) {
    RedirectTo({ res, asPath: '/404' } as NextPageContext);
  }

  if (IsCSR && found) {
    releases = found.releases;
  } else {
    if (info) {
      releases = (await SafePromise(() =>
        apiRelease.getAll({ device_id: info?._id }).then(r => r.data?.list)
      ))!;
    }
  }

  if (IsCSR && !found) {
    deviceCache.push({
      info,
      codename,
      releases,
    });
  }

  return {
    info,
    releases,
  };
};

export default Page;
