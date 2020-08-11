import config from "config";
import cookie from "js-cookie";

export const keyOfLang = "of-lang";

function validatedLocale(locale: string) {
  const isValidLocale = config.localePattern.test(locale);
  return isValidLocale ? locale : config.locale.default;
}

export const SetCurrentLocale = (locale: string) => {
  locale = validatedLocale(locale);
  config.locale.current = locale;
  cookie.set(keyOfLang, locale, { expires: 1000, sameSite: "Lax" });
};

export const GetCurrentLocale = (): string => {
  const locale = cookie.get(keyOfLang) || config.locale.current;
  return validatedLocale(locale);
};
