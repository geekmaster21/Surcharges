import { useLocation } from "@reach/router"
import { ILocationState } from "../models";

export const SetCurrentLocale = (lang?: string) => {
    const location = useLocation();
    const state = (location?.state ?? {}) as ILocationState;
    location.state = { ...state, currentLocale: lang || 'en' };
}

export const GetCurrentLocale = () => {
    const location = useLocation();
    const state = (location?.state ?? {}) as ILocationState;
    return state?.currentLocale;
}
