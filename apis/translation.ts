import { HTTP } from "core";
import { ILanguage } from "models";
import { Dotize } from "utils";

export async function apiGetTranslation(BASE_URL: string, language: string) {
    return HTTP.get(`${BASE_URL}/translations/${language}.json`)
        .then(data => Dotize.convert(data));
}

export async function apiGetAllLanguages(BASE_URL: string): Promise<ILanguage[]> {
    return HTTP.get(`${BASE_URL}/translations/translations.json`);
}
