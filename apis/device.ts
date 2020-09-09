import { HTTP } from 'core';
import { EReleaseType, IAllReleases, IDevice, IRelease } from 'models';
import config from 'config';

const URL = `${config.apiUrl}/device`;

export async function apiGetAllDeviceList(): Promise<IDevice[]> {
  return HTTP.get(URL);
}

export async function apiGetDeviceByCode(code: string): Promise<IDevice> {
  return HTTP.get(`${URL}/${code}`);
}

export async function apiGetAllReleases(code: string): Promise<IAllReleases> {
  return HTTP.get(`${URL}/${code}/releases`);
}

export async function apiGetRelease(
  code: string,
  releaseType: EReleaseType,
  version?: string
): Promise<IRelease> {
  let url = `${URL}/${code}/releases/${releaseType}`;
  if (version) url = `${url}/${version === 'last' ? 'last' : version}`;
  return HTTP.get(url);
}
