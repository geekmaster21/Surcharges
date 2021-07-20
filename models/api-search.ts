export interface ISearchDevice {
  _id?: string;
  codenames?: string;
}

export interface ISearchDeviceAll extends ISearchDevice {
  oem_name?: string;
  model_name?: string;
  supported?: boolean;
  maintainer?: string;
  skip?: number;
  limit?: number;
}

export interface ISearchMaintainerAll {
  _id?: string;
  skip?: number;
  limit?: number;
}

export interface ISearchMaintainer {
  _id?: string;
  username?: string;
}

export interface ISearchReleaseAll extends ISearchRelease {
  device_id?: string;
  codename?: string;
  version?: string;
  type?: string;
  skip?: number;
  limit?: number;
}

export interface ISearchRelease {
  _id?: string;
  device_id?: string;
}
