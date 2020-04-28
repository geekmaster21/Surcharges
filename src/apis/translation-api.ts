import { HTTP } from "../core";

export function apiGetTranslation(language: string) {
    return HTTP.get(`/translations/${language}.json`);
}
