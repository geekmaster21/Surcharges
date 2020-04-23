import { IRelease } from "./release";

export enum ReleaseType {
    beta = 'beta',
    stable = 'stable',
};

export interface IAllReleases {
    [ReleaseType.beta]: IRelease[];
    [ReleaseType.stable]: IRelease[];
}
