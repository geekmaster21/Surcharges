import { HTTP } from 'core';
import { IDevice, ISearchDevice, ISearchDeviceAll } from 'models';

const URL = 'devices';

function get<T = ISearchDevice>(p?: T) {
  return HTTP.get<T, IDevice[]>(`${URL}`, p);
}

function getAll<T = ISearchDeviceAll>(p?: T) {
  return HTTP.get<T, { list: IDevice[]; count: number }>(URL, p);
}

function getById(_id?: string) {
  return HTTP.get<string, IDevice>(`${URL}/${_id}`);
}

export default {
  get,
  getAll,
  getById,
};
