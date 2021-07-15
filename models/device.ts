import { IMaintainer } from './maintainer';

export interface IDevice {
  _id: string;
  codenames: string[];
  model_names: string[];
  oem_name: string;
  notes?: string;
  supported: boolean;
}

export interface IDeviceWithMaintainer extends IDevice {
  ab_device: boolean;
  maintainer: IMaintainer;
}

export interface IDeviceGroup {
  oem: string;
  devices: IDevice[];
}
