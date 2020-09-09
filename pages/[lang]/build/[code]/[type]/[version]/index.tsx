import { Card, CardContent } from '@material-ui/core';
import { apiGetDeviceByCode } from 'apis';
import { DeviceInfo, MetaTagsDynamic, Release } from 'components';
import { titleCase } from 'core';
import { EReleaseType, IDevice } from 'models';
import { NextPageContext } from 'next';
import { RedirectTo, SafePromise } from 'utils';

type Props = {
  code?: string;
  info: IDevice;
  version?: string;
  type?: EReleaseType;
};

const Page = ({ code, type, version, info }: Props) => {
  const m = info;
  const url = `/build/${code}/${type}/${version}`;
  const title = `${titleCase(type)} build v${version} for ${m.fullname} (${
    m.codename
  })`;
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
          identifier: version,
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
      <Card>
        <CardContent>
          <DeviceInfo {...info} />
          <Release
            code={code}
            showAllBuild
            defaultExpanded
            version={version || 'last'}
            type={type || EReleaseType.stable}
          />
        </CardContent>
      </Card>
    </>
  );
};

Page.getInitialProps = async ({
  query: { type, version, ...query },
  res,
}: NextPageContext) => {
  const code = query.code as string;
  const info = await SafePromise(() => apiGetDeviceByCode(code));
  if (!info) {
    RedirectTo({ res, asPath: '/404' } as NextPageContext);
  }

  return {
    info,
    code,
    type,
    version,
  };
};

export default Page;
