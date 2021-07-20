export interface IDevice {
  _id: string;
  codenames: string[];
  model_names: string[];
  oem_name: string;
  notes?: string;
  supported: boolean;
  title: string;
  url: string;
  maintainer: Maintainer;
  uses_boot_partition: boolean;
  installation_instruction: string;
  support: Support;
  sources: string;
}

export interface IDeviceGroup {
  oem: string;
  devices: IDevice[];
}

export interface Maintainer {
  _id: string;
  name: string;
}

export interface Support {
  telegram_chat: string;
  forum: string;
}
