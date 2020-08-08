import config from "config";
import cookies from "js-cookie";

export const keyOfLang = "of-lang";

export const SetCurrentLocale = (locale: string) => {
  const _locale = locale || "en";
  console.log("set _locale", _locale);
  config.currentLocale = _locale;
  cookies.set(keyOfLang, _locale);
};

export const GetCurrentLocale = (): string => {
  const _locale =
    cookies.get(keyOfLang) ||
    config.currentLocale ||
    config.defaultLang ||
    "en";
  console.log("get _locale", _locale);
  return _locale;
};
