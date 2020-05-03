import { useLocation } from "@reach/router";
import { APP_CONFIG } from "../app-config";
import { ILocationState } from "../models";

export const SetCurrentLocale = (lang?: string) => {
    const location = useLocation();
    const state = (location?.state ?? {}) as ILocationState;
    location.state = { ...state, currentLocale: lang || APP_CONFIG.defaultLang };
}

export const GetCurrentLocale = () => {
    const location = useLocation();
    const state = (location?.state ?? {}) as ILocationState;
    return state?.currentLocale;
}
