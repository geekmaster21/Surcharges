import { HTTP } from "../core";

export function apiGetAllTranslations(lang: string) {
    return HTTP.get(`translations/${lang}.json`);
}
