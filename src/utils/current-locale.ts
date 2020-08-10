import config from "config";
import cookie from "js-cookie";

export const keyOfLang = "of-lang";

export const SetCurrentLocale = (locale: string) => {
  let _locale = locale || config.defaultLang;
  const isValidLocale = config.localePattern.test(_locale);
  _locale = isValidLocale ? _locale : config.defaultLang;
  config.currentLocale = _locale;
  cookie.set(keyOfLang, _locale);
};

export const GetCurrentLocale = (): string => {
  const _locale =
    cookie.get(keyOfLang) || config.currentLocale || config.defaultLang;
  return _locale;
};
