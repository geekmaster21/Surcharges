import { http } from "../core";
import { IAllReleases, IDevice, IRelease, EReleaseType } from "../models";
import { CONFIG } from "./config";

const URL = `${CONFIG.apiUrl}/device`;

export function apiGetAllDeviceList(): Promise<IDevice[]> {
    return http.get(URL);
}

export const apiGetDeviceByCode = (code: string): Promise<IDevice> => {
    return http.get(`${URL}/${code}`);
}

export const apiGetAllReleases = (code: string): Promise<IAllReleases> => {
    return http.get(`${URL}/${code}/releases`);
}

export const apiGetRelease = (code: string, releaseType: EReleaseType, version?: string): Promise<IRelease> => {
    let url = `${URL}/${code}/releases/${releaseType}`;
    if (version)
        url = `${url}/${version === 'last' ? 'last' : version}`;
    return http.get(url);
}
