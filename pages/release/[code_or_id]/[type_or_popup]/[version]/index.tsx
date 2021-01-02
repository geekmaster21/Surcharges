import { apiDevice, apiRelease } from 'apis';
import Page from 'components/Release-Page';
import { IDeviceWithMaintainer, IRelease } from 'models';
import { NextPageContext } from 'next';
import { RedirectTo } from 'utils';

(Page as any).getInitialProps = async ({
  res,
  query: { code_or_id, type_or_popup, version, popup },
}: NextPageContext) => {
  const codename = code_or_id;
  let release: IRelease | undefined = undefined;
  let info: IDeviceWithMaintainer | undefined = undefined;

  // when url looks like /release/h830/beta/R10.1_001
  info = await apiDevice
    .get({ codename })
    .then(r => (r.isSuccess ? r.data! : undefined));

  if (!info) {
    RedirectTo({ res, asPath: '/404' } as NextPageContext);
  }

  if (info && info._id) {
    release = await apiRelease
      .getAll({ type: type_or_popup, codename, version, device_id: info._id })
      .then(r => (r.isSuccess ? r.data!.list.pop() : undefined));
  }

  return {
    info,
    popup,
    release,
  };
};

export default Page;
