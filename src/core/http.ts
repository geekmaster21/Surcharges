import config from 'config';

async function get<T = any, S = any>(url: string, params?: T) {
  const _url = new URL(`${config.apiUrl}/${url}`);
  if (params) {
    _url.search = new URLSearchParams(params as any).toString();
  }

  let apiResponse: Response | null = null;
  try {
    apiResponse = await fetch(_url.toString(), {
      method: 'GET',
    });
    const json = await apiResponse.json();
    const isList =
      'count' in json && 'data' in json && Array.isArray(json.data);
    return {
      _resp: apiResponse,
      isSuccess: apiResponse.status === 200,
      data: (isList ? { list: json.data, count: json.count } : json) as S,
    };
  } catch (error) {
    return { isSuccess: false, data: null, error, _resp: apiResponse };
  }
}

export default {
  get,
};
