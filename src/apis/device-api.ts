import { http } from "../core";
import { IDevice, IRelease, IAllReleases } from "../models";
import { CONFIG } from "./config";

const URL = `${CONFIG.apiUrl}/device`;

export function getAllDeviceList(): Promise<IDevice[]> {
    return http.get(URL);
}

export const getDeviceByCode = (code: string): Promise<IDevice> => {
    return http.get(`${URL}/${code}`);
}

export const getAllReleases = (code: string): Promise<IAllReleases> => {
    return http.get(`${URL}/${code}/releases`);
}

export const getRelease = (code: string, releaseType: 'stable' | 'beta', version?: string | -1): Promise<IRelease> => {
    let url = `${URL}/${code}/releases/${releaseType}`;
    if (version)
        url = `${url}/${version === -1 ? 'last' : version}`;
    return http.get(url);
}
