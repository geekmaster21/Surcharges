import { apiGetAllReleases, apiGetDeviceByCode } from "apis";
import { DeviceInfo } from "components/common";
import { DeviceReleases } from "components/device-releases";
import { IAllReleases, IDevice } from "models";
import { NextPageContext } from "next";
import { RedirectTo } from "utils";

type Props = {
  info: IDevice;
  releases: IAllReleases;
};

const Device = ({ info, releases }: Props) => {
  return (
    <>
      <DeviceInfo {...info} />
      <DeviceReleases code={info.codename} releases={releases} />
    </>
  );
};

async function safe<T>(fn: () => Promise<T>) {
  return fn().catch(() => Promise.resolve(undefined));
}

Device.getInitialProps = async ({ query, res }: NextPageContext) => {
  const code = query.code as string;
  const info = await safe(() => apiGetDeviceByCode(code));
  if (!info) {
    RedirectTo({ res, asPath: "/404" } as NextPageContext);
  }
  const releases = await safe(() => apiGetAllReleases(code));

  return {
    info,
    releases,
  };
};

export default Device;
