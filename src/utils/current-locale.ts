import config from "config";
import cookie from "js-cookie";

export const keyOfLang = "of-lang";

export const SetCurrentLocale = (locale: string) => {
  const _locale = locale || config.defaultLang;
  config.currentLocale = _locale;
  cookie.set(keyOfLang, _locale);
};

export const GetCurrentLocale = (): string => {
  const _locale =
    cookie.get(keyOfLang) || config.currentLocale || config.defaultLang;
  return _locale;
};
