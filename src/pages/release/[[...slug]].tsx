import { apiDevice, apiRelease } from 'apis';
import Page from 'components/Release-Page';
import { IDeviceWithMaintainer, IRelease } from 'models';
import { NextPageContext } from 'next';
import { RedirectTo } from 'utils';

Page.getInitialProps = async ({ res, query: { slug = [] } }) => {
  let release: IRelease | undefined = undefined;
  let info: IDeviceWithMaintainer | undefined = undefined;
  let [code_or_releaseId, buildType_or_popup, version, popup] =
    slug as string[];

  // when url looks like:
  // /release/alice/beta/R11.1_3
  // /release/61083cbcdfa9fd3c4edb57df/changelogs
  // /release/61083cbcdfa9fd3c4edb57df/buildnotes
  // /release/61083cbcdfa9fd3c4edb57df/bugs
  if (code_or_releaseId && buildType_or_popup && (version || popup)) {
    info = await apiDevice
      .get({ codename: code_or_releaseId })
      .then(r => (r.isSuccess ? r.data! : undefined));

    if (info?._id) {
      release = await apiRelease
        .getAll({
          version,
          type: buildType_or_popup,
          codename: code_or_releaseId,
          device_id: info._id,
        })
        .then(r => (r.isSuccess ? r.data!.list.pop() : undefined));
    }

    // when url looks like:
    // /release/61083cbcdfa9fd3c4edb57df
  } else if (code_or_releaseId) {
    release = await apiRelease
      .getById(code_or_releaseId as string)
      .then(r => (r.isSuccess ? r.data! : undefined));

    if (release?.device_id) {
      info = await apiDevice
        .getById(release.device_id)
        .then(r => (r.isSuccess ? r.data! : undefined));
      popup = buildType_or_popup;
    }
  }

  // when we don't have devide info, route to 404 page
  if (!info) {
    console.error({
      errMsg: 'device info not found for requested release page',
      code_or_releaseId,
      buildType_or_popup,
      version,
      popup,
    });
    RedirectTo({ res, asPath: '/404' } as NextPageContext);
  }

  return {
    info,
    popup,
    release,
  };
};

export default Page;
