import config from 'config';
import nodeFetch, { Response } from 'node-fetch';
import sentry from 'utils/sentry';

async function get<T = any, S = any>(url: string, params?: T) {
  const _url = new URL(`${config.apiUrl}/${url}`);
  if (params) {
    _url.search = new URLSearchParams(params as any).toString();
  }

  let _resp: Response | null = null;
  try {
    _resp = await nodeFetch(_url.toString(), {
      method: 'GET',
    });
    const _succ_res = await _resp.json();
    const keys = Object.keys(_succ_res);
    const isList =
      keys.length === 2 && 'data' in _succ_res && 'count' in _succ_res;
    return {
      _resp,
      isSuccess: _resp.status === 200,
      data: (isList
        ? { list: _succ_res.data, count: _succ_res.count }
        : _succ_res) as S,
    };
  } catch (error) {
    sentry.error({
      __source__: 'core/http',
      error,
      response: _resp,
    });
    return { isSuccess: false, data: null, error, _resp };
  }
}

export default {
  get,
};
