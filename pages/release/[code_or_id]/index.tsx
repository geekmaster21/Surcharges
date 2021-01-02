import { apiDevice, apiRelease } from 'apis';
import Page from 'components/Release-Page';
import { IDeviceWithMaintainer, IRelease } from 'models';
import { NextPageContext } from 'next';
import { RedirectTo } from 'utils';

(Page as any).getInitialProps = async ({
  res,
  query: { code_or_id, type_or_popup },
}: NextPageContext) => {
  let release: IRelease | undefined = undefined;
  let info: IDeviceWithMaintainer | undefined = undefined;

  // when url looks like /release/507f191e810c19729de860ea
  release = await apiRelease
    .getById(code_or_id as string)
    .then(r => (r.isSuccess ? r.data! : undefined));

  if (release && release.device_id) {
    info = await apiDevice
      .getById(release.device_id)
      .then(r => (r.isSuccess ? r.data! : undefined));
  }

  if (!info) {
    RedirectTo({ res, asPath: '/404' } as NextPageContext);
  }

  return {
    info,
    popup: type_or_popup,
    release,
  };
};

export default Page;
