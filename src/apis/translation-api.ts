import { HTTP } from "../core";
import { Dotize } from "../utils";

export function apiGetTranslation(language: string) {
    return HTTP.get(`/translations/${language}.json`)
        .then(data => Dotize.convert(data));
}
