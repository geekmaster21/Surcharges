import { HTTP } from "../core";
import { ILanguage } from "../models";
import { Dotize } from "../utils";

export async function apiGetTranslation(language: string) {
    return HTTP.get(`/translations/${language}.json`)
        .then(data => Dotize.convert(data));
}

export async function apiGetAllLanguages(): Promise<ILanguage[]> {
    return HTTP.get(`/translations/translations.json`);
}
