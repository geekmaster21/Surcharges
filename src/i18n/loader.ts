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
