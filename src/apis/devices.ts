import { http } from "../core";
import { IDevice } from "../models";
import { CONFIG } from "./config";

export function getAllDeviceList(): Promise<IDevice[]> {
    return (
        //   http.get(`${CONFIG.apiUrl}/device`);
        http.get<{ key: string }>('json/devices.json')
    ).then(data => Object.entries(data).map(m => ({ code: m[0], name: m[1] })));
}

export const getDeviceByCode = (code: string) => {
    return http.get(`${CONFIG.apiUrl}/device/${code}`);
}
