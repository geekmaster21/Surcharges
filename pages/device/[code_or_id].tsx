import { apiDevice, apiRelease } from 'apis';
import { DeviceInfo, DeviceReleases, MetaTagsDynamic } from 'components';
import { IDevice, IRelease } from 'models';
import { NextPageContext } from 'next';
import { IsCSR, RedirectTo, SafePromise } from 'utils';

type Props = {
  info: IDevice;
  releases: IRelease[];
};

const Page = ({ info, releases }: Props) => {
  const url = `/device/${info._id}`;
  const { title } = info;

  return (
    <>
      <MetaTagsDynamic
        url={url}
        title={title}
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
  id: string;
  info: IDevice;
  releases: IRelease[];
}[] = [];

async function getDeviceInfo(id: string) {
  return await SafePromise(() =>
    apiDevice.getById(id).then(r => (r.data?._id ? r.data : undefined))
  );
}

Page.getInitialProps = async ({ query, res }: NextPageContext) => {
  const id = query.code_or_id as string;
  let releases: IRelease[] = undefined as any;
  let info: IDevice | undefined;

  const found = deviceCache.find(f => f.id === id);

  if (IsCSR && found) {
    info = found.info;
  } else {
    // search by id
    info = await getDeviceInfo(id);

    // search by code if device info is still missing
    if (!info) {
      const _info = (
        await SafePromise(() => apiDevice.get({ codenames: id }))
      )?.data?.pop?.();
      if (_info?._id) {
        info = await getDeviceInfo(_info._id);
      }
    }
  }

  if (!info) {
    RedirectTo({ res, asPath: '/404' } as NextPageContext);
  }

  if (IsCSR && found) {
    releases = found.releases;
  } else {
    if (info) {
      releases = (await SafePromise(() =>
        apiRelease.getAll({ device_id: info!._id }).then(r => r.data?.list)
      ))!;
    }
  }

  if (IsCSR && !found) {
    deviceCache.push({
      id,
      info,
      releases,
    } as any);
  }

  return {
    info,
    releases,
  };
};

export default Page;
