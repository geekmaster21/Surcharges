import { TStorageKey, TStorageLocation } from "../models";

function getStorage(storage: TStorageLocation) {
    switch (storage) {
        case 'session':
            return localStorage;
        case 'local':
        default:
            return sessionStorage;
    }
}

function parse<T>(data: T) {
    return JSON.parse(data as any || null) as T
}

function getData<T = any>(storageKey: TStorageKey, location: TStorageLocation = 'local') {
    const storage = getStorage(location);
    const data = storage.getItem(storageKey);
    return parse(data) as unknown as T;
}

function setData<T = any>(storageKey: TStorageKey, data: T, location: TStorageLocation = 'local') {
    const storage = getStorage(location);
    storage.setItem(storageKey, JSON.stringify(data));
}

function removeData(storageKeys: TStorageKey[], removeFromAllStorage = true, location: TStorageLocation = 'local') {
    if (removeFromAllStorage) {
        storageKeys.forEach(f => {
            localStorage.removeItem(f);
            sessionStorage.removeItem(f);
        });
    } else {
        const storage = getStorage(location);
        storageKeys.forEach(f => storage.removeItem(f));
    }
}

export default {
    get: getData,
    set: setData,
    remove: removeData
}
