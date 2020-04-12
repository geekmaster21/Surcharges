export interface IDevice {
    codename: string;
    modelname: string;
    fullname: string;
    oem?: string;
}


export interface IDeviceGroup {
    oem: string;
    devices: IDevice[];
}
