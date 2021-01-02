import { HTTP } from 'core';
import {
  IDevice,
  IDeviceWithMaintainer,
  ISearchDevice,
  ISearchDeviceAll,
} from 'models';

const URL = 'devices/';

function get<T = ISearchDevice>(p?: T) {
  return HTTP.get<T, IDeviceWithMaintainer>(`${URL}get`, p);
}

function getAll<T = ISearchDeviceAll>(p?: T) {
  return HTTP.get<T, { list: IDevice[]; count: number }>(URL, p);
}

function getById(_id?: string) {
  return HTTP.get<string, IDeviceWithMaintainer>(`${URL}${_id}`);
}

export default {
  get,
  getAll,
  getById,
};
