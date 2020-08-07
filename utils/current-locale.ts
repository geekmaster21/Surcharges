import config from 'config';
import Cookies from 'universal-cookie';

const ofLang = 'of-lang';
const cookies = new Cookies();

export const SetSelectedLocale = (lang?: string) => {
    cookies.set(ofLang, lang);
}

export const GetSelectedLocale = () => {
    return cookies.get(ofLang) || config.defaultLang;
}
