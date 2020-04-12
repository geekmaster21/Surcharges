import { http } from "../core";
import { IDevice } from "../models";
import { CONFIG } from "./config";

export function getAllDeviceList(): Promise<IDevice[]> {
    return (
        http.get(`${CONFIG.apiUrl}/device`)
        //  http.get<IDevice[]>('json/devices.json')
    );
}

export const getDeviceByCode = (code: string) => {
    return http.get(`${CONFIG.apiUrl}/device/${code}`);
}
