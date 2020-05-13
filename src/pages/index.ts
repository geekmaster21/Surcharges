import loadable from '@loadable/component'

const Home = loadable(() => import('./home/Home'));
const Device = loadable(() => import('./device/Device'));
const NotFound = loadable(() => import('./404/Not-Found'));
const Build = loadable(() => import('./build/Build'));

export {
    Home,
    Device,
    NotFound,
    Build
}
