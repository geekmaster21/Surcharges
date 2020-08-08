import config from "config";
import cookies from "js-cookie";

export const keyOfLang = "of-lang";

export const SetCurrentLocale = (locale: string) => {
  const _locale = locale || config.defaultLang;
  config.currentLocale = _locale;
  cookies.set(keyOfLang, _locale);
};

export const GetCurrentLocale = (): string => {
  const _locale =
    cookies.get(keyOfLang) || config.currentLocale || config.defaultLang;
  return _locale;
};
