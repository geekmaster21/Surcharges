export interface IRelease {
  _id: string;
  device_id: string;
  date: number;
  filename: string;
  actualDate?: Date;
  size: number;
  md5: string;
  version: string;
  type: string;
}

export interface IReleaseWithDetails extends IRelease {
  recovery_img: { size: number; md5: string };
  changelog?: string[];
  bugs?: string[];
  notes?: string;
  code?: string;
  mirrors: { DL: string };
}

export type TReleaseType = 'beta' | 'stable';
