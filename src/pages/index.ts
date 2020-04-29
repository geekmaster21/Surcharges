import loadable from '@loadable/component'

const Home = loadable(() => import('./home/Home'));
const Device = loadable(() => import('./device/Device'));
const NotFound = loadable(() => import('./404/Not-Found'));
const DirectBuild = loadable(() => import('./direct-build/Direct-Build'));

export {
    Home,
    Device,
    NotFound,
    DirectBuild
}
