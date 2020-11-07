import { apiGetAllReleases, apiGetDeviceByCode } from 'apis';
import { DeviceInfo, DeviceReleases, MetaTagsDynamic } from 'components';
import { IAllReleases, IDevice } from 'models';
import { NextPageContext } from 'next';
import { IsCSR, RedirectTo, SafePromise } from 'utils';

type Props = {
  info: IDevice;
  releases: IAllReleases;
};

const Page = ({ info, releases }: Props) => {
  const m = info;
  const url = `/device/${m.codename}`;
  const title = `${m.fullname} (${m.codename}) build releases`;
  return (
    <>
      <MetaTagsDynamic
        url={url}
        title={title}
        desc={`Orangefox recovery for ${m.fullname} (${m.codename})`}
        jsonLd={{
          '@type': 'SoftwareApplication',
          url,
          name: title,
          downloadUrl: url,
          description: title,
          accessMode: 'visual',
          identifier: m._id,
          operatingSystem: 'Android',
          applicationCategory: 'SoftwareApplication',
          applicationSubCategory: 'CustomRecovery',
          maintainer: m.maintainer?.name || 'None',
          offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'XXX',
            availability: `https://schema.org/${
              m.maintained === 3 ? 'Discontinued' : 'InStock'
            }`,
          },
        }}
      />
      <DeviceInfo {...info} />
      <DeviceReleases code={info.codename} releases={releases} />
    </>
  );
};

const deviceCache: {
  code: string;
  info?: IDevice;
  releases?: IAllReleases;
}[] = [];

Page.getInitialProps = async ({ query, res }: NextPageContext) => {
  const code = query.code as string;
  let info: IDevice | undefined = undefined,
    releases: IAllReleases | undefined = undefined;

  const found = deviceCache.find(f => f.code === code);

  if (IsCSR && found) {
    info = found.info;
  } else {
    info = await SafePromise(() => apiGetDeviceByCode(code));
  }

  if (!info) {
    RedirectTo({ res, asPath: '/404' } as NextPageContext);
  }

  if (IsCSR && found) {
    releases = found.releases;
  } else {
    if (info) {
      releases = await SafePromise(() => apiGetAllReleases(code));
    }
  }

  if (IsCSR && !found) {
    deviceCache.push({
      code,
      info,
      releases,
    });
  }

  return {
    info,
    releases,
  };
};

export default Page;