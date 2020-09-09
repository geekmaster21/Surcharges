import { IRelease } from './release';

export enum EReleaseType {
  beta = 'beta',
  stable = 'stable',
}

export interface IAllReleases {
  [EReleaseType.beta]: IRelease[];
  [EReleaseType.stable]: IRelease[];
}
