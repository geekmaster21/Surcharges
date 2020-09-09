interface IHttpRequest<T = any> {
  data: T;
  options: RequestInit;
}

const get = async <T = any>(url: string, options?: RequestInit) =>
  fetch(url, {
    method: 'GET',
    ...options,
  }).then(x => x.json() as Promise<T>);

const post = async <T = any>(url: string, { data, options }: IHttpRequest<T>) =>
  fetch(url, {
    method: 'POST',
    body: (data && JSON.stringify(data)) || null,
    ...options,
  }).then(x => x.json() as Promise<T>);

const put = async <T = any>(url: string, { data, options }: IHttpRequest<T>) =>
  fetch(url, {
    method: 'PUT',
    body: (data && JSON.stringify(data)) || null,
    ...options,
  }).then(x => x.json() as Promise<T>);

const del = async <T = any>(url: string, options: RequestInit) =>
  fetch(url, {
    method: 'DELETE',
    ...options,
  }).then(x => x.json() as Promise<T>);

export default {
  get,
  post,
  put,
  delete: del,
};
