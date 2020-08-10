import config from "config";
import cookie from "js-cookie";

export const keyOfLang = "of-lang";

function validatedLocale(locale: string) {
  const isValidLocale = config.localePattern.test(locale);
  return isValidLocale ? locale : config.defaultLang;
}

export const SetCurrentLocale = (locale: string) => {
  locale = validatedLocale(locale);
  config.currentLocale = locale;
  cookie.set(keyOfLang, locale, { expires: 1000 });
};

export const GetCurrentLocale = (): string => {
  const locale = cookie.get(keyOfLang) || config.currentLocale;
  return validatedLocale(locale);
};
