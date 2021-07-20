export interface IRelease {
  actualDate?: Date;
  _id: string;
  device_id: string;
  version: string;
  type: string;
  date: number;
  url: string;
  changelog: string[];
  bugs: string[];
  notes: string;
  variants: Variants;
}

export type TReleaseType = 'beta' | 'stable';

export interface Variant {
  variant_id: string;
  release_id: string;
  mirrors: Mirrors;
  size: number;
  md5: string;
  filename: string;
}

export interface Mirrors {
  [p: string]: string;
}

export interface Variants {
  miui: Variant;
  custom_roms: Variant;
}
