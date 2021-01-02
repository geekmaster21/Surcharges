import { HTTP } from 'core';
import {
  IRelease,
  IReleaseWithDetails,
  ISearchRelease,
  ISearchReleaseAll,
} from 'models';

const URL = 'releases/';

function get<T = ISearchRelease>(p?: T) {
  return HTTP.get<T, IReleaseWithDetails>(`${URL}get/`, p);
}

function getAll<T = ISearchReleaseAll>(p?: T) {
  return HTTP.get<T, { list: IRelease[]; count: number }>(URL, p);
}

function getById(_id?: string) {
  return HTTP.get<string, IReleaseWithDetails>(`${URL}${_id}`);
}

export default {
  get,
  getAll,
  getById,
};
