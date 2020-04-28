import { HTTP } from "../core";
import { IAllReleases, IDevice, IRelease, EReleaseType } from "../models";
import { CONFIG } from "./config";

const URL = `${CONFIG.apiUrl}/device`;

export function apiGetAllDeviceList(): Promise<IDevice[]> {
    return HTTP.get(URL);
}

export const apiGetDeviceByCode = (code: string): Promise<IDevice> => {
    return HTTP.get(`${URL}/${code}`);
}

export const apiGetAllReleases = (code: string): Promise<IAllReleases> => {
    return HTTP.get(`${URL}/${code}/releases`);
}

export const apiGetRelease = (code: string, releaseType: EReleaseType, version?: string): Promise<IRelease> => {
    let url = `${URL}/${code}/releases/${releaseType}`;
    if (version)
        url = `${url}/${version === 'last' ? 'last' : version}`;
    return HTTP.get(url);
}
