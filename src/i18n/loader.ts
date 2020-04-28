import translations from './translations';

const TRANSLATIONS = translations as any;

export type TAllLocaleInfo = {
    key: string,
    label: string
};

export const LoadTranslations = (lang?: string) => {
    const locale = lang ?? navigator.language;
    return TRANSLATIONS[locale];
};

export const AllLocales = (): TAllLocaleInfo[] => {
    const keys = Object.keys(translations);
    return keys.reduce((a, c) => {
        const localeName = TRANSLATIONS[c]['_localeName_'];
        a.push({
            key: c,
            label: localeName
        })
        return a;
    }, [] as TAllLocaleInfo[]);
}
